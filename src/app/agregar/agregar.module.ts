import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarPage } from './agregar.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AgregarPageRoutingModule } from './agregar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarPage]
})
export class AgregarPageModule {}