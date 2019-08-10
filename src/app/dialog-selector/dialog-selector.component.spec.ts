import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectorComponent } from './dialog-selector.component';

describe('DialogSelectorComponent', () => {
  let component: DialogSelectorComponent;
  let fixture: ComponentFixture<DialogSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
