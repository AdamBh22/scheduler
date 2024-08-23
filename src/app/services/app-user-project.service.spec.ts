import { TestBed } from '@angular/core/testing';

import { AppUserProjectService } from './app-user-project.service';

describe('AppUserProjectService', () => {
  let service: AppUserProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
