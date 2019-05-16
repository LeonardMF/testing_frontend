import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluComponent } from './rasa-nlu.component';

describe('RasaNluComponent', () => {
  let component: RasaNluComponent;
  let fixture: ComponentFixture<RasaNluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
