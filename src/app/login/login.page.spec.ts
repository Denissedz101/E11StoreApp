import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';

import {
  MockAlertController,
  MockLoadingController,
  MockRouter,
  MockAuthService,
  MockSessionService
} from '../mocks/mock-services';

import { MockUserDataService } from '../mocks/mock-user-data.service'; 


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthService;
  let sessionService: SessionService;
  let alertCtrl: any;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: SessionService, useClass: MockSessionService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: Router, useClass: MockRouter },
        { provide: AlertController, useClass: MockAlertController },
        { provide: LoadingController, useClass: MockLoadingController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

   
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    alertCtrl = TestBed.inject(AlertController);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  }));

  it('debería crear el componente LoginPage', () => {
    expect(component).toBeTruthy();
  });

});
