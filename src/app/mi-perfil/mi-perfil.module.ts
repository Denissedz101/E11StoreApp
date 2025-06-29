import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';
import { TopMenuModule } from '../components/top-menu/top-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopMenuModule,
    MiPerfilPageRoutingModule
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
