import { Component, inject } from '@angular/core';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { get } from 'firebase/database';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { NotificationsService } from '../services/notifications.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  expanded: boolean = true;
  expanded2: boolean = true;
  expanded3: boolean = true;


  toggleCard() {
    this.expanded = !this.expanded;
  }

  toggleCard2() {
    this.expanded2 = !this.expanded2;
  }

  toggleCard3() {
    this.expanded3 = !this.expanded3;
  }
  

  constructor(private firestore: Firestore,private navCtrl: NavController, private notifications: NotificationsService) { }
  public db = getDatabase()
  public reference = ref(this.db, 'Peso')
  public stateRef = ref(this.db, 'Puerta')
  public weight = 0;
  public state = "Cerrada";
  public dataRepisaAlta: any[] = [];
  public dataRepisaBaja: any[] = [];
  public dataRepisaMedia: any[] = [];
  
goBack() {
    this.navCtrl.back();
  }
  ionViewDidEnter() {
    this.readKit();
    this.readMedicinesFromShelf('Alta');
    this.readMedicinesFromShelf('Media');
    this.readMedicinesFromShelf('Baja');
    this.dataRepisaAlta = [];
    this.dataRepisaBaja = [];
    this.dataRepisaMedia = [];
  }



  // gets data from realtime database (medkit)
  async readKit() {
    await get(this.reference).then((snapshot) => {
      const value = snapshot.val()
      this.weight = value;
    })
    await get(this.stateRef).then((snapshot) => {
      const value = snapshot.val()

      this.state = value == 0 ? "Cerrada" : "Abierta";
    })
  }
  // reads data from realtime database (medkit) every 2 seconds
  readTask = setInterval(() => {
    this.readKit()
  }, 2000);

  // notify() {
  //   //this is a test notification
  //   const hora = new Date().getHours()
  //   this.notifications.scheduleTest("Peso en la hora: " + hora, 1, "Peso: " + this.weight + "g")
  // }


  //aqui empieza el desvergue

  async readMedicinesFromShelf(shelf: string): Promise<void> {
    try {
      const shelfRef = collection(this.firestore, 'Medicaciones');
      const q = query(shelfRef, where('Detalles.repisa', '==', shelf))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        const medicineData = doc.data();
        switch (shelf) {
          case 'Alta':
            this.dataRepisaAlta.push(medicineData);
            break;
          case 'Media':
            this.dataRepisaMedia.push(medicineData);
            break;
          case 'Baja':
            this.dataRepisaBaja.push(medicineData);
            break;
          case "default":
            break;
        }
      });
    } catch (error) {
      console.error('Error getting medicines:', error);
    }
  }


}

