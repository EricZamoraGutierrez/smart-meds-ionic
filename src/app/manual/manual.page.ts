import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['/tabs/tab4']);
  }
}
