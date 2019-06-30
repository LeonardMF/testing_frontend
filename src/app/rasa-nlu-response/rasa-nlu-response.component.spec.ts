import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluResponseComponent } from './rasa-nlu-response.component';

describe('RasaNluResponseComponent', () => {
  let component: RasaNluResponseComponent;
  let fixture: ComponentFixture<RasaNluResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
