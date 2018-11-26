import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCobrosPage } from './lista-cobros';

@NgModule({
  declarations: [
    ListaCobrosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCobrosPage),
  ],
})
export class ListaCobrosPageModule {}
