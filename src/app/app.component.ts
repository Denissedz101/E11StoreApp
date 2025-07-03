import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private userDataService: UserDataService
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.userDataService.init();
    console.log('☑ App inicializada y storage listo');
  }
}

