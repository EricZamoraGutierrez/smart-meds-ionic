import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeerPage } from './leer.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LeerPageRoutingModule } from './leer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LeerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LeerPage]
})
export class LeerPageModule {}