import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [
    CommonModule,
    IonicModule 
  ],
  exports: [TopMenuComponent] 
})
export class TopMenuModule {}
