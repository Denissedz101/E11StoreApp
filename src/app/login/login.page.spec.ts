import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [LoginPage],
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(LoginPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
