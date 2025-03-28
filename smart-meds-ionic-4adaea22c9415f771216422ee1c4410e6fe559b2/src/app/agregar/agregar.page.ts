import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { and } from 'firebase/firestore';
import { PrescriptionStorageService } from '../services/prescription-storage.service';
import { UserService } from '../services/user.service';
import { Firestore, collection, addDoc, getFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { register } from 'swiper/element';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

register();

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})



export class AgregarPage implements OnInit {
  
  hours: number[];
  myFormGeneral: FormGroup;
  formDataGeneral: any[] = [];

  myFormTiempo: FormGroup;
  formDataTiempo: any[] = [];

  myFormOtros: FormGroup;
  formDataOtros: any[] = [];

  db = getFirestore();

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private prescriptionStorage: PrescriptionStorageService, private router: Router,
    private firestore: Firestore, private userService: UserService) {
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

  goBack() {
    this.navCtrl.back();
  }
  

  redirectToHomePage() {
    setTimeout(() => {
      this.router.navigate(['/tabs/tab1']); // Redirecciona a la página "home"
    }, 2000);
    
  }
  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    var imageUrl = image.webPath;
  
    const imageElement = document.createElement('img');
    if (imageUrl) {
      imageElement.src = imageUrl;
    }
  };

  //User ID
  userId:string = "";
  //Medicine ID
  medId: any = "";

  ngOnInit() {
    this.getID();
  }

  async getID() {
    const id: string = await this.userService.getUser();
    this.userId = id;
    console.log(this.userId);
  }

  async submitForm() {
    console.log(this.myFormGeneral.value);
    console.log(this.myFormTiempo.value);
    console.log(this.myFormOtros.value);
    if (this.myFormGeneral.valid && this.myFormTiempo.valid && this.myFormOtros.valid) {
      this.formDataGeneral.push(this.myFormGeneral.value),
        this.formDataTiempo.push(this.myFormTiempo.value),
        this.formDataOtros.push(this.myFormOtros.value),
        // Reiniciar el formulario
        this.myFormGeneral.reset();
      this.myFormTiempo.reset();
      this.myFormOtros.reset();
      this.saveMeds();
      console.log("formulado enviado");
      this.router.navigate(['/tabs/tab1'], );

    }else
    {
      console.log("Formulario no valido");
    }
  }
  isFormValidGeneral(): boolean {
    return this.myFormGeneral.valid;
  }
  isFormValidTiempo(): boolean {
    return this.myFormTiempo.valid;
  }
  isFormValidOtros(): boolean {
    return this.myFormOtros.valid;
  }

  //userData = {
  //name: "",
  //email: "",
  //}

  // expanded: boolean = false;
  // expanded2: boolean = false;
  // expanded3: boolean = false;
  // expanded4: boolean = false;

  // toggleCard() {
  //   this.expanded = !this.expanded;
  // }

  // toggleCard2() {
  //   this.expanded2 = !this.expanded2;
  // }

  // toggleCard3() {
  //   this.expanded3 = !this.expanded3;
  // }

  // toggleCard4() {
  //   this.expanded4 = !this.expanded4;
  // }

  

  //Aqui empieza mi desvergue

  async savePrescription() {
    await this.prescriptionStorage.addPrescription(this.formDataTiempo[0].selectedHour,
      this.formDataTiempo[0].inicio, this.formDataTiempo[0].fin, this.userId, this.medId).then((res) => {
        console.log(res);
      }
      );
  }

  async saveOtherDetails() {
    await this.prescriptionStorage.addMedDetails(
      this.formDataOtros[0].peso,this.formDataOtros[0].repisaForm, this.formDataOtros[0].contra, this.formDataOtros[0].comentario, this.medId).then((res) => {
        console.log(res);
      }
      );
  }

  async saveMeds() {
   await this.prescriptionStorage.addMeds(this.formDataGeneral[0].name, this.formDataGeneral[0].dosis,
      this.formDataGeneral[0].medida, this.formDataGeneral[0].presenForm).then((response) => {
        console.log(response);
        this.medId = response.id;
        console.log(this.medId);

        
        this.savePrescription();
        this.saveOtherDetails();
      });
  }



}

