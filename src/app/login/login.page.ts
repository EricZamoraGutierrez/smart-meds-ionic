import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';
import { LoginCheckService } from '../services/login-check.service';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  showemailError = async () => {
    await Toast.show({
      text: 'Correo invalido',
    });
  };
  showpaswordError = async () => {
    await Toast.show({
      text: 'Contraseña invalida',
    });
  };
  showemailUse = async () => {
    await Toast.show({
      text: 'Correo ya en uso',
    });
  };
  showloginError = async () => {
    await Toast.show({
      text: 'Usuario o contraseña incorrectos',
    });
  };
  constructor(private UserService: UserService,
    private router: Router,
    private firestore: Firestore,
    private check: LoginCheckService) {

  }
  public show: boolean = true;
  selectedTab: string = 'tab1';



  userData = {
    name: "",
    email: "",
    phone: "",
    lastname: ""
  }

  login = {
    email: "",
    pass: ""
  }

  register = {
    name: "",
    email: "",
    pass: ""
  }
  uid: any;

  registerUser(email: string, password: string) {
    console.log(email, password);
    this.UserService.register({ email, password })
      .then(response => {
        console.log("Success Register!");
        this.check.setLogin(email, password)
        if (response) {
          console.log(response.user.uid);
          this.show = false;
          this.uid = response.user.uid;
          //boton de carga pls!!!


        } else {
          console.log("Error Register!");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code == "auth/email-already-in-use") {
          this.loginUser(email, password);
          this.showemailUse();
        }
        if (err.code == "auth/invalid-email") {
          console.log("Invalid Email");
          this.showemailError();
        }
        if (err.code == "auth/weak-password") {
          console.log("Weak Password");
          this.showpaswordError();
        }
      })
  }

  loginUser(email: string, password: string) {
    this.UserService.login({ email, password })
      .then(response => {
        console.log("Success Login!");
        this.check.setLogin(email, password)
        if (response) {
          console.log(response);
          this.router.navigate(['/tabs']);
          this.UserService.store(email);
        } else {
          console.log("Error Login!");
          //aviso de error 

        }
      })
      .catch((err) => {
        console.log(err);
        this.showloginError();
      })
  }


  saveUserData(name: string, lastname: string, phone: string, email: string) {
    const loginid = this.uid;
    const ProfilePic = "imagen_2023-07-10_140810894.png";
    const dbref = collection(this.firestore, 'Users');
    addDoc(dbref, { name, lastname, phone, email, loginid, ProfilePic})
      .then(response => {
        console.log("Success!");
        console.log(response);
        this.router.navigate(['/tabs']);

        //crear una tab de transición en el futuro
      })
      .catch((err) => {
        console.log(err);
        //DEBEMOS HACER VALIDACIONES DE LOS DATOS
      })
    this.UserService.store(email);
  }



}


