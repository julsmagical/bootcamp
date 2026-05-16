import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDetail } from './chef-detail';

describe('ChefDetail', () => {
  let component: ChefDetail;
  let fixture: ComponentFixture<ChefDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
