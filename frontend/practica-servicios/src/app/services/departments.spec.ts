import { TestBed } from '@angular/core/testing';

import { DepartmentsServices } from './departments';

describe('Departments', () => {
  let service: DepartmentsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
