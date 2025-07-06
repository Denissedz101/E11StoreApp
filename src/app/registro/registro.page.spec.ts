import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [RegistroPage],
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(RegistroPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
