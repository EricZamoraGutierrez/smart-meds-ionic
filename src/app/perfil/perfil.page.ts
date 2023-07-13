import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';
import { getFirestore } from 'firebase/firestore';
import { Router } from '@angular/router';
import { error } from 'console';
import { getBlob, getBytes} from 'firebase/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})

export class PerfilPage implements OnInit {
  myForm: FormGroup;
  imageSource: string | ArrayBuffer | null = null;
  formData: any[] = []; // Arreglo para almacenar los datos del formulario

  constructor(private formBuilder: FormBuilder, private userService: UserService, private firestore: Firestore, private router: Router) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.[a-z])(?=.[A-Z]).{8,}$/)]],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.getUserData();
    // this.userID = this.userService.getUser();
  }

  //userdata
  userData = {
    name: "",
    email: "",
    lastname: "",
    phone: "",
    //lastname
  }
  userID: any;
  ProfilePic = "";
  userDoc: any;
  finishedLoading: boolean = false;

  regresar() {
    this.router.navigate(['/tabs/tab4']);
  }

  displayImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imageSource = reader.result;
        }
      };
      console.log(input.files[0]);
      reader.readAsDataURL(input.files[0]);
      this.userService.saveProfilePic(input.files[0]);
      this.ProfilePic = input.files[0].name;
      updateDoc(this.userDoc, {
        ProfilePic: "images" + this.ProfilePic
      }),
        (error: any) => {
          console.log(error);
        }
    }
  }

  submitForm(): void {
    if (this.myForm.valid) {
      this.formData.push(this.myForm.value);
      // Reiniciar el formulario
      // this.myForm.reset();
      console.log('Formulario enviado. Datos guardados:', this.formData);
      this.updateUserData(this.myForm.value.name, this.myForm.value.phone, this.myForm.value.lastname, this.userDoc, this.userID);
    }
  }

  isFormValid(): boolean {
    return this.myForm.valid;
  }

  async getUserData() {

    const db = getFirestore();
    const id: string = await this.userService.getUser();
    // this.userService.getProfilePic(id).then((url) => {
    //   this.imageSource = url;
    // });
    this.userID = id;
    const docref = doc(db, 'Users', id);
    this.userDoc = docref;
    console.log(docref);

    try {
      const docSnap = await getDoc(docref);
      console.log(docSnap.data());
      const data: any = docSnap.data();
      this.userData.email = data.email;
      this.userData.name = data.name;
      this.userData.phone = data.phone;
      this.userData.lastname = data.lastname;
      this.ProfilePic = data.ProfilePic;
    } catch (error) {
      console.log(error)
    }
    this.userService.getProfilePicURL(this.ProfilePic).then((url) => {
     
      this.imageSource = url;

    });

    //Usar esta variable para definir cuando quitar la barra de carga
    this.finishedLoading = true;
  }

  async updateUserData(name: string, phone: string, lastname: string, dbRef: any, id: string) {

    this.userService.updateUserData( name, phone, lastname, dbRef, id).then(() => {
      console.log("Datos actualizados");
    }).catch((error) => {
      console.log(error);
    });

    this.getUserData();

    }


}

