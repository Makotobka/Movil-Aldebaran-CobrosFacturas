import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleFacturaPage } from './detalle-factura';

@NgModule({
  declarations: [
    DetalleFacturaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleFacturaPage),
  ],
})
export class DetalleFacturaPageModule {}
