import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { MockSessionService } from '../mocks/mock-services';
import { MockUserDataService } from '../mocks/mock-user-data.service';
import { Storage } from '@ionic/storage-angular';

// evitar NullInjectorError
const storageMock = {
  create: () => Promise.resolve(storageMock),
  get: () => Promise.resolve(null),
  set: () => Promise.resolve(),
  remove: () => Promise.resolve(),
  clear: () => Promise.resolve()
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SessionService, useClass: MockSessionService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: Storage, useValue: storageMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar agregarAlCarrito al presionar el botón', () => {
    const botones = fixture.nativeElement.querySelectorAll('[data-testid="btn-agregar-al-carrito"]');
    expect(botones.length).toBeGreaterThan(0);

    spyOn(component, 'agregarAlCarrito');
    botones[0].click();
    expect(component.agregarAlCarrito).toHaveBeenCalled();
  });
});
