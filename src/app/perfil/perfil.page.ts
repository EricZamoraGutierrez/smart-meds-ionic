import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, doc, getDoc } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit {
  myForm: FormGroup;
  imageSource: string | ArrayBuffer | null = null;
  formData: any[] = []; // Arreglo para almacenar los datos del formulario

  constructor(private formBuilder: FormBuilder, private userService: UserService, private firestore: Firestore) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.[a-z])(?=.[A-Z]).{8,}$/)]],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
    });

  }
  userID: any;
  ngOnInit(): void {
    this.getUserData();
    this.userID = this.userService.getUser();
  }

  //userdata
  userData = {
    name: "",
    email: "",
    lastname: "",
    phone: "",
    //lastname
  }

  regresar(){
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
      this.userService.saveProfilePic(input.files[0], this.userID);
    }
  }

  submitForm(): void {
    if (this.myForm.valid) {

      this.formData.push(this.myForm.value);

      // Reiniciar el formulario
      this.myForm.reset();


      console.log('Formulario enviado. Datos guardados:', this.formData);
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
    const docref = doc(db, 'Users', id);
    console.log(docref);
    let ProfilePic = "";
    try {
      const docSnap = await getDoc(docref);
      console.log(docSnap.data());
      const data: any = docSnap.data();
      this.userData.email = data.email;
      this.userData.name = data.name;
      this.userData.phone = data.phone;
      this.userData.lastname = data.lastname;
      ProfilePic = data.ProfilePic;
    } catch (error) {
      console.log(error)
    }
    // this.userService.getProfilePic(ProfilePic).then((url) => {
    //   this.imageSource = url;
    // });

  }

}