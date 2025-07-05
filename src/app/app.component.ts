import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserDataService } from './services/user-data.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent  {
  
  constructor(
    private platform: Platform,
    private userDataService: UserDataService,
    private storageService: StorageService
    
  ) {
    this.initializeApp();
    console.log('StorageService:', this.storageService);

  }


  async initializeApp() {
      await this.platform.ready();
      await this.storageService.init();
    console.log('☑ App inicializada y storage listo');
  }
}

