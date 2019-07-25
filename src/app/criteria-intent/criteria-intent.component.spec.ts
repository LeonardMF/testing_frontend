import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaIntentComponent } from './criteria-intent.component';

describe('CriteriaIntentComponent', () => {
  let component: CriteriaIntentComponent;
  let fixture: ComponentFixture<CriteriaIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
