import { Component } from '@angular/core';
import { LoginCheckService } from './services/login-check.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private check: LoginCheckService, private UserService: UserService, private router: Router) {}

  async ngOnInit() {
    const loggedIn = await this.check.checkLogin();
    if (loggedIn) {
      this.UserService.login({ email: loggedIn[0], password: loggedIn[1] });
    } else {
      console.log('Not logged in');
      this.router.navigate(['/login']);
    }
  }
}
