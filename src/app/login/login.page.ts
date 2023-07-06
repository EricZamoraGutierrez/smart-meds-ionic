import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private UserService: UserService,
    private router: Router,
    private firestore: Firestore) {

  }
  selectedTab: string = 'tab1';
  public userData: any = {
    user: '',
    password: '',
  }
  
  login= {
    email: "",
    pass: ""
  }

  register={
    name: "",
    email: "",
    pass: ""
  }

  // register = new FormGroup({
  //   email:  new FormControl(''),
  //   password: new FormControl('')
  // });

  // buttonClick(): void{
  //   console.log('Form valid', this.register.valid);
  //   if (this.register.valid){
  //     this.router.navigate(['/tabs'])
  //   }else{
  //     this.router.navigate(['**'])
  //   }
    
  
  registerUser(email: string, password: string, name: string){
    console.log(email, password);
    this.UserService.register({ email , password})
    .then(response=>{
      console.log("Success Register!");
      this.router.navigate(['/login']);
      if(response){
      console.log(response);
      this.UserService.addUser({ name, email, password, id: response.user.uid});
    }else{
      console.log("Error Register!");
    }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  loginUser(email: string, password: string){
    this.UserService.register({ email , password})
    .then(response=>{
      console.log("Success Login!");
      this.router.navigate(['/tabs']);
      if(response){
      console.log(response);
    }else{
      console.log("Error Login!");
    }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
