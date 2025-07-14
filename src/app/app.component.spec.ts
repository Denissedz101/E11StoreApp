import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular'; // ✅ importar
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service'; // si lo usas en el app.component
import { UserDataService } from './services/user-data.service'; // si se usa

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicStorageModule.forRoot()], // ✅ incluir
      providers: [StorageService, UserDataService], // si AppComponent los usa directamente
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
