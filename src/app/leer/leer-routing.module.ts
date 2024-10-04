import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeerPage } from './leer.page';

const routes: Routes = [
  {
    path: '',
    component: LeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeerPageRoutingModule {}
