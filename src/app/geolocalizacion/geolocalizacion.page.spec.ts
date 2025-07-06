import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocalizacionPage } from './geolocalizacion.page';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('GeolocalizacionPage', () => {
  let component: GeolocalizacionPage;
  let fixture: ComponentFixture<GeolocalizacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeolocalizacionPage],
      imports: [IonicStorageModule.forRoot()] // 👈 Importante
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
