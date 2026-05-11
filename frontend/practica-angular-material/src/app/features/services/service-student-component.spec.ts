import { TestBed } from '@angular/core/testing';

import { ServiceStudentComponent } from './service-student-component';

describe('ServiceStudentComponent', () => {
  let service: ServiceStudentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStudentComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
