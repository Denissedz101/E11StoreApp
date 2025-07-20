import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MisComprasPage } from './mis-compras.page';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { CarritoService } from '../services/carrito.service';
import { MockSessionService } from '../mocks/mock-services';
import { MockUserDataService } from '../mocks/mock-user-data.service';
import { NavController } from '@ionic/angular';


class MockNavController {
  navigateRoot = jasmine.createSpy('navigateRoot');
}

describe('MisComprasPage', () => {
  let component: MisComprasPage;
  let fixture: ComponentFixture<MisComprasPage>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['setCount']);
  let alertCtrlSpy: jasmine.SpyObj<AlertController>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;

  beforeEach(waitForAsync(() => {
    alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);

    TestBed.configureTestingModule({
      declarations: [MisComprasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SessionService, useClass: MockSessionService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertCtrlSpy },
        { provide: ToastController, useValue: toastCtrlSpy },
        { provide: NavController, useClass: MockNavController } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MisComprasPage);
    component = fixture.componentInstance;

    alertCtrlSpy.create.and.resolveTo({ present: () => Promise.resolve() } as any);
    toastCtrlSpy.create.and.resolveTo({ present: () => Promise.resolve() } as any);

    fixture.detectChanges(); // Importante para ejecutar ngOnInit
  }));

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar carrito al iniciar', waitForAsync(async () => {
    await component.ngOnInit();
    expect(component.carrito.length).toBeGreaterThan(0);
    expect(component.total).toBeGreaterThan(0);
  }));

  it('debería eliminar un ítem del carrito', waitForAsync(async () => {
    await component.ngOnInit();
    await component.eliminarItem(1);
    expect(carritoServiceSpy.setCount).toHaveBeenCalled();
  }));

  it('debería finalizar la compra', waitForAsync(async () => {
    await component.ngOnInit();
    await component.finalizarCompra();
    expect(toastCtrlSpy.create).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'], { replaceUrl: true });
  }));
});
