import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaNluEntitiesComponent } from './rasa-nlu-entities.component';

describe('RasaNluEntitiesComponent', () => {
  let component: RasaNluEntitiesComponent;
  let fixture: ComponentFixture<RasaNluEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaNluEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaNluEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
