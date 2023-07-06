import { Component } from '@angular/core';
import { LoginCheckService } from './services/login-check.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private check: LoginCheckService, private UserService: UserService, private router: Router) {}

  async ngOnInit() {
    const loggedIn = await this.check.checkLogin();
    const email = loggedIn.email.value;
    const password = loggedIn.password.value;
    
    if (email && password) {
      this.UserService.login({ email:email , password: password }).then((response) => {
        console.log(response);
        if (response) {
          console.log('Logged in');
          //un pop up quizas?
        }
      });
    } else {
      console.log('Not logged in');
      this.router.navigate(['/login']);
    }
  }
}
