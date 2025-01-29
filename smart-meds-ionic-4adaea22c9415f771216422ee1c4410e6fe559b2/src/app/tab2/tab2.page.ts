import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, doc} from '@angular/fire/firestore';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedSegment: string = 'option1';  // Valor predeterminado

  constructor(private firestore: Firestore, private router: Router, private navCtrl: NavController) {this.expanded = true, this.expanded2 = true, this.expanded3 = true, this.expanded4 = true; }

  ionViewDidEnter() {
    this.readPrescriptions();
    this.data = [];
  }

  expanded: boolean = false;
  expanded2: boolean = false;
  expanded3: boolean = false;
  expanded4: boolean = false;

  toggleCard() {
    this.expanded = !this.expanded;
  }

  toggleCard2() {
    this.expanded2 = !this.expanded2;
  }

  toggleCard3() {
    this.expanded3 = !this.expanded3;
  }

  toggleCard4() {
    this.expanded4 = !this.expanded4;
  }

  redirectToAgregar() {
    this.router.navigateByUrl('/agregar');
  }
  
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;  // Obtener el valor seleccionado
    console.log(this.selectedSegment);
  }

  goBack() {
    this.navCtrl.back();
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
        presen: doc.data()['presen'],
        peso: doc.data()['Detalles']['peso'],
        dosis: doc.data()['dosis'],
      }
      );
    });
    console.log(this.data);
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

