import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDotComponent } from './case-dot.component';

describe('CaseDotComponent', () => {
  let component: CaseDotComponent;
  let fixture: ComponentFixture<CaseDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
