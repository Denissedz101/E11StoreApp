import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SqliteDbService } from './sqlite-db.service';

describe('SqliteDBService', () => {
  let service: SqliteDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
