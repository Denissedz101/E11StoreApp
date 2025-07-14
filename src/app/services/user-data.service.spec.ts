import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UserDataService } from './user-data.service';
import { StorageService } from './storage.service'; // si tienes un servicio intermedio

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [UserDataService, StorageService]
    });
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    (expect as any)(service).toBeTruthy();
  });
});
