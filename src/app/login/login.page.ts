import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  selectedTab: string = 'tab1';
  public userData: any = {
    user: '',
    password: '',
  }

  register = new FormGroup({
    email:  new FormControl(''),
    password: new FormControl('')
  });

  constructor (private router: Router){}

  buttonClick(): void{
    console.log('Form valoid', this.register.valid);
    if (this.register.valid){
      this.router.navigate(['/tabs'])
    }else{
      this.router.navigate(['**'])
    }
    
  }
}