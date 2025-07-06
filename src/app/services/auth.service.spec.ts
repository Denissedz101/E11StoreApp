import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [IonicStorageModule.forRoot()], 
    providers: [AuthService]
  });
  service = TestBed.inject(AuthService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
