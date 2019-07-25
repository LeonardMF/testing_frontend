import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaEntityComponent } from './criteria-entity.component';

describe('CriteriaEntityComponent', () => {
  let component: CriteriaEntityComponent;
  let fixture: ComponentFixture<CriteriaEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
