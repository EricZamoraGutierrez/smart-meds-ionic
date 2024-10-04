import { TestBed } from '@angular/core/testing';

import { LoginCheckService } from './login-check.service';

describe('LoginCheckService', () => {
  let service: LoginCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
