import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { IonicModule } from '@ionic/angular';
import { GeolocalizacionPageRoutingModule } from './geolocalizacion-routing.module';
import { GeolocalizacionPage } from './geolocalizacion.page';
import { MockSessionService } from '../mocks/mock-services';
import { SessionService } from '../services/session.service';

const isCypress = typeof window !== 'undefined' && !!window.Cypress;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    GeolocalizacionPageRoutingModule
  ],
  providers: [
    {
      provide: SessionService,
      useClass: isCypress ? MockSessionService : SessionService
    }
  ],
  declarations: [GeolocalizacionPage]
})
export class GeolocalizacionPageModule {}
