import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [StorageService]
    }).compileComponents();

    service = TestBed.inject(StorageService);
    await service.init(); //  _storage internamente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
