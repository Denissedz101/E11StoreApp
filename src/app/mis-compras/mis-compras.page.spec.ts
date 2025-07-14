import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisComprasPage } from './mis-compras.page';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('MisComprasPage', () => {
  let component: MisComprasPage;
  let fixture: ComponentFixture<MisComprasPage>;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [MisComprasPage],
    imports: [IonicStorageModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(MisComprasPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
