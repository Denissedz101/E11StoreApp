import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { IonicModule } from '@ionic/angular';

import { GeolocalizacionPageRoutingModule } from './geolocalizacion-routing.module';

import { GeolocalizacionPage } from './geolocalizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    GeolocalizacionPageRoutingModule
  ],
  declarations: [GeolocalizacionPage]
})
export class GeolocalizacionPageModule {}
