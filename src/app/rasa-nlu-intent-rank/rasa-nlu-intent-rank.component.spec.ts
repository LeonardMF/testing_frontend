import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluIntentRankComponent } from './rasa-nlu-intent-rank.component';

describe('RasaNluIntentRankComponent', () => {
  let component: RasaNluIntentRankComponent;
  let fixture: ComponentFixture<RasaNluIntentRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluIntentRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluIntentRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
