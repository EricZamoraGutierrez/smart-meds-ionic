import { TestBed } from '@angular/core/testing';

import { PrescriptionStorageService } from './prescription-storage.service';

describe('PrescriptionStorageService', () => {
  let service: PrescriptionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
