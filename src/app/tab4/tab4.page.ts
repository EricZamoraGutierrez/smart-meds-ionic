import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { LoginCheckService } from '../services/login-check.service';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private router: Router, private login: LoginCheckService) { }

  cerrarsesion(){
    this.router.navigate(['/login']);
    this.login.setLogout();
  }
  ngOnInit() {
  }

  manual(){
    this.router.navigate(['/manual']);
  }

  perfil(){
    this.router.navigate(['/perfil']);
  }

  async copyToClipboard(text: string) {
    await Clipboard.write({ string: text }); 
    this.showemailUse();

  }
  showemailUse = async () => {
    await Toast.show({
      text: 'Copiado al portapapeles',
    });
  };
}

