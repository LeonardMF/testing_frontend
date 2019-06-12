import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasaCoreComponent } from './rasa-core.component';

describe('RasaCoreComponent', () => {
  let component: RasaCoreComponent;
  let fixture: ComponentFixture<RasaCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasaCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasaCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
