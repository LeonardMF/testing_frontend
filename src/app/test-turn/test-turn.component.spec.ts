import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTurnComponent } from './test-turn.component';

describe('TestTurnComponent', () => {
  let component: TestTurnComponent;
  let fixture: ComponentFixture<TestTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
