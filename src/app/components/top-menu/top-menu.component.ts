import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  standalone: false
  
})
export class TopMenuComponent {
  constructor(
    private router: Router
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

  

}