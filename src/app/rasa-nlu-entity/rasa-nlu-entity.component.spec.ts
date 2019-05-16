import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluEntityComponent } from './rasa-nlu-entity.component';

describe('RasaNluEntityComponent', () => {
  let component: RasaNluEntityComponent;
  let fixture: ComponentFixture<RasaNluEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
