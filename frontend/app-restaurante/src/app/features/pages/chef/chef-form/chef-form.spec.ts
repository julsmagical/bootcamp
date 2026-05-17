import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefForm } from './chef-form';

describe('ChefForm', () => {
  let component: ChefForm;
  let fixture: ComponentFixture<ChefForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
