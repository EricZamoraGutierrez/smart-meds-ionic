import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedSegment: string = 'option1';  // Valor predeterminado

  constructor(private router: Router, private navCtrl: NavController) {this.expanded = true, this.expanded2 = true, this.expanded3 = true, this.expanded4 = true; }

  expanded: boolean = false;
  expanded2: boolean = false;
  expanded3: boolean = false;
  expanded4: boolean = false;

  toggleCard() {
    this.expanded = !this.expanded;
  }

  toggleCard2() {
    this.expanded2 = !this.expanded2;
  }

  toggleCard3() {
    this.expanded3 = !this.expanded3;
  }

  toggleCard4() {
    this.expanded4 = !this.expanded4;
  }

  redirectToAgregar() {
    this.router.navigateByUrl('/agregar');
  }
  
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;  // Obtener el valor seleccionado
    console.log('Segment cambiado a:', this.selectedSegment);
  }

  goBack() {
    this.navCtrl.back();
  }
}

