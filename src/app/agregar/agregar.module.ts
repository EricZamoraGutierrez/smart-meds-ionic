import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarPage } from './agregar.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AgregarPageRoutingModule } from './agregar-routing.module';
import { register } from 'swiper/element/bundle';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AgregarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarPage],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarPageModule {}