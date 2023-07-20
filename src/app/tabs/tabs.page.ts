import { Component } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
    
      defineCustomElements(window);
    
  }

}
