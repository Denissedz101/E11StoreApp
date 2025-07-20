import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistroPage } from './registro.page';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { MockSessionService } from '../mocks/mock-services';
import { MockUserDataService } from '../mocks/mock-user-data.service';
import { Storage } from '@ionic/storage-angular';

// Mock Storage manual
class MockStorage {
  create = () => Promise.resolve();
  get = () => Promise.resolve(null);
  set = () => Promise.resolve();
  remove = () => Promise.resolve();
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: SessionService, useClass: MockSessionService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: Router, useValue: routerSpy },
        { provide: Storage, useClass: MockStorage }, 
        AlertController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar como inválido si el formulario está vacío', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('debería validar contraseñas iguales', () => {
    component.registroForm.patchValue({ contrasena: '1234', repetir_contrasena: '1234' });
    expect(component.contraseniasIguales()).toBeTrue();
  });


});
