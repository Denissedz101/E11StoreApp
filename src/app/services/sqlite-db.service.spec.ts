import { TestBed } from '@angular/core/testing';

import { SqliteDBService } from './sqlite-db.service';

describe('SqliteDBService', () => {
  let service: SqliteDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
