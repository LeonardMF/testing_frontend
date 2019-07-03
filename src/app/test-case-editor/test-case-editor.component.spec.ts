import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseEditorComponent } from './test-case-editor.component';

describe('TestCaseEditorComponent', () => {
  let component: TestCaseEditorComponent;
  let fixture: ComponentFixture<TestCaseEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
