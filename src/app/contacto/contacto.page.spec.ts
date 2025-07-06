import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoPage } from './contacto.page';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('ContactoPage', () => {
  let component: ContactoPage;
  let fixture: ComponentFixture<ContactoPage>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ContactoPage],
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(ContactoPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
