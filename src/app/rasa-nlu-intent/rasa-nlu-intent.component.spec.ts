import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluIntentComponent } from './rasa-nlu-intent.component';

describe('RasaNluIntentComponent', () => {
  let component: RasaNluIntentComponent;
  let fixture: ComponentFixture<RasaNluIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
