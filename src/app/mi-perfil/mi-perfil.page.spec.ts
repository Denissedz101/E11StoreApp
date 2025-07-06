import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiPerfilPage } from './mi-perfil.page';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('MiPerfilPage', () => {
  let component: MiPerfilPage;
  let fixture: ComponentFixture<MiPerfilPage>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [MiPerfilPage],
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(MiPerfilPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
