import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { IonicModule } from '@ionic/angular';
import { MisComprasPageRoutingModule } from './mis-compras-routing.module';
import { MisComprasPage } from './mis-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    MisComprasPageRoutingModule
  ],
  declarations: [MisComprasPage]
})
export class MisComprasPageModule {}
