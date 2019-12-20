import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestDashboardComponent } from './contest-dashboard.component';

describe('ContestDashboardComponent', () => {
  let component: ContestDashboardComponent;
  let fixture: ComponentFixture<ContestDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
