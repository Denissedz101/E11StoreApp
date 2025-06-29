import { Component } from '@angular/core';
import { SqliteService } from './services/sqlite-db.service';
//instalar sqlite por CLI

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
  
export class AppComponent {
  constructor(private sqliteService: SqliteService) { }
  
    ngOnInit() {
    this.sqliteService.init(); // Llamar a init()

    this.sqliteService.dbReady.subscribe((ready: boolean) => {
      if (ready) {
        console.log('✅ SQLite inicializado');
      }
    });

  }



}
