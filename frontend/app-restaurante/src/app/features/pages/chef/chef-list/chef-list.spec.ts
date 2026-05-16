import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefList } from './chef-list';

describe('ChefList', () => {
  let component: ChefList;
  let fixture: ComponentFixture<ChefList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefList],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
