import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { MockSessionService } from '../services/session.service.mock';
import { SessionService } from '../services/session.service';

// Detectar si estamos en Cypress
const isCypress = typeof window !== 'undefined' && !!window.Cypress;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    HomePageRoutingModule
  ],
  providers: [
    {
      provide: SessionService,
      useClass: isCypress ? MockSessionService : SessionService
    }
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
