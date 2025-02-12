import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDoc, query, doc, getDocs } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: Firestore, private navCtrl: NavController ) { }
  id: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.readPrescriptions();
  }

  data: any = [];


  goBack() {
    this.navCtrl.back();
  }

  async readPrescriptions() {
  
      const ref = doc(this.firestore, 'Medicaciones', this.id);
      const querySnapshot = await getDoc(ref);
      this.data = querySnapshot.data();
      console.log(this.data);
        // this.data.push({
        //   id: querySnapshot.data()?.['Detalles']?.['MedID'],
        //   name: querySnapshot.data()?.['name'],
        //   comment: querySnapshot.data()?.['Detalles']['comentario'],
        //   interval: '',
        // });
      
  
      // const ref2 = collection(this.firestore, 'Prescripciones');
      // const q2 = query(ref2)
      // const querySnapshot2 = await getDocs(q2);
      // querySnapshot2.forEach((doc) => {
      //   var i = 0;
      //   for(i=0; i<this.data.length; i++){
      //     if(this.data[i]['id'] == doc.data()['MedID']){
      //       this.data[i]['interval'] = doc.data()['interval'];
      //     }        
      //   }
      // });
  
    }

}
