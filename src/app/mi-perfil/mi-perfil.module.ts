import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';
import { TopMenuModule } from '../components/top-menu/top-menu.module';
import { MockSessionService } from '../mocks/mock-services';
import { SessionService } from '../services/session.service';

const isCypress = typeof window !== 'undefined' && !!window.Cypress;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    MiPerfilPageRoutingModule
  ],
  providers: [
    {
      provide: SessionService,
      useClass: isCypress ? MockSessionService : SessionService
    }
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
