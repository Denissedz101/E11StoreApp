import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { IonicModule } from '@ionic/angular';
import { ContactoPageRoutingModule } from './contacto-routing.module';

import { ContactoPage } from './contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    TopMenuModule,
    ContactoPageRoutingModule
  ],
  declarations: [ContactoPage]
})
export class ContactoPageModule {}
