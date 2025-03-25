import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, getDoc, query, doc, getDocs } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getFirestore } from 'firebase/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})


export class EditarPage implements OnInit {

 hours: number[] ;
  myFormGeneral: FormGroup;
  formDataGeneral: any[] = [];

  myFormTiempo: FormGroup;
  formDataTiempo: any[] = [];

  myFormOtros: FormGroup;
  formDataOtros: any[] = [];

  db = getFirestore();


  constructor(private route: ActivatedRoute, private firestore: Firestore, private navCtrl: NavController, private router: Router, private formBuilder: FormBuilder ) {

    this.hours = Array.from({ length: 24 }, (_, i) => i);
    this.myFormGeneral = this.formBuilder.group({
      name: ['', Validators.required],
      dosis: ['', Validators.required],
      medida: ['', Validators.required],
      presenForm: ['', Validators.required],
    });
  this.myFormTiempo = this.formBuilder.group({
    selectedHour: ['', Validators.required],
    inicio: ['', Validators.required],
    fin: ['', Validators.required], 
  });
  this.myFormOtros = this.formBuilder.group({
    peso: ['', Validators.required],
    repisaForm: ['', Validators.required],
    contra: ['', Validators.required],
    comentario: ['', Validators.required],
  });
   }
  id: any;
  //User ID
  userId:string = "";
  //Medicine ID
  medId: any = "";
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'));
    this.readPrescriptions();
  }

  data: any = [];

  redirectToAgregar() {
    this.router.navigateByUrl('/agregar');
  }

  goBack() {
    this.navCtrl.back();
  }

  async readPrescriptions() {
  
      const ref = doc(this.firestore, 'Medicaciones', this.id);
      const querySnapshot = await getDoc(ref);
      this.data = querySnapshot.data();
      console.log(this.data);
        this.data.push({
          id: querySnapshot.data()?.['Detalles']?.['MedID'],
          name: querySnapshot.data()?.['name'],
          comment: querySnapshot.data()?.['Detalles']['comentario'],
          interval: '',
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

}
