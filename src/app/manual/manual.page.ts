import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor(private navCtrl: NavController, private router:Router) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }
}
