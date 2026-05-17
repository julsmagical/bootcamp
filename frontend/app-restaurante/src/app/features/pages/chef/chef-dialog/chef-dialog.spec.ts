import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDialog } from './chef-dialog';

describe('ChefDialog', () => {
  let component: ChefDialog;
  let fixture: ComponentFixture<ChefDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ChefDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
