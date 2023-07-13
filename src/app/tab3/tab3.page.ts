import { Component, inject } from '@angular/core';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { get } from 'firebase/database';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private database: Database = inject(Database)
  constructor( private firestore: Firestore, private notifications: NotificationsService) { }
  public db = getDatabase()
  public reference = ref(this.db, 'Peso/peso' )
  public weight = 0;

  readWeight() {
    get(this.reference).then((snapshot) => {
      const value = snapshot.val()
      this.weight = value;

     
     
    }
    )
  } 

  readTask = setInterval( () =>{
    this.readWeight()
  }, 10000);

  
  notify(){
     //this is a test notification
     const hora = new Date().getHours()
     this.notifications.scheduleTest("Peso en la hora" + hora, 1, "Peso: " + this.weight + "g")
  }
  

}

