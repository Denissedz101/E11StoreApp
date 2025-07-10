import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';
import { MockSessionService } from '../services/session.service.mock';
import { SessionService } from '../services/session.service';

const isCypress = typeof window !== 'undefined' && !!window.Cypress;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroPageRoutingModule
  ],
  providers: [
    {
      provide: SessionService,
      useClass: isCypress ? MockSessionService : SessionService
    }
  ],
  declarations: [RegistroPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroPageModule {}
