import { TestBed } from '@angular/core/testing';

import { ServiceCourseComponent } from './service-course-component';

describe('ServiceCourseComponent', () => {
  let service: ServiceCourseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCourseComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
