import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  selectedTab: string = 'tab1';

  email: string = "";
  password: string = "";

  constructor(private router:Router) {}
ngOnInit(): void {
    
}

  login() {
    // Aquí puedes agregar la lógica de inicio de sesión
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);

    // Lógica adicional para realizar la autenticación, redirección, etc.
  }

  agregar(){
    this.router.navigate(['/agregar']);
  }
}
