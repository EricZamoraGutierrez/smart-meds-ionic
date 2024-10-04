import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, doc} from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  selectedTab: string = 'tab1';


  constructor(private router: Router, private firestore: Firestore) { }


  ionViewDidEnter() {
    this.readPrescriptions();
    this.data = [];
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }

  data: any = [];

  id: string = '';

  async readPrescriptions() {

    const ref = collection(this.firestore, 'Medicaciones');
    const q = query(ref)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      this.data.push({
        id: doc.data()['Detalles']['MedID'],
        name: doc.data()['name'],
        comment: doc.data()['Detalles']['comentario'],
        interval: '',
      }
      );
    });

    const ref2 = collection(this.firestore, 'Prescripciones');
    const q2 = query(ref2)
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      var i = 0;
      for(i=0; i<this.data.length; i++){
        if(this.data[i]['id'] == doc.data()['MedID']){
          this.data[i]['interval'] = doc.data()['interval'];
        }        
      }
    });

  }


  delete(id:any){
    const ref = doc(this.firestore, 'Medicaciones', id);
    deleteDoc(ref);
    this.data = [];
    this.readPrescriptions();

  }
}
