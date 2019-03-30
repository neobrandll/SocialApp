import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowsPage } from './follows.page';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FollowsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [FollowsPage]
})
export class FollowsPageModule {}
