import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakewordComponent } from './wakeword.component';

describe('WakewordComponent', () => {
  let component: WakewordComponent;
  let fixture: ComponentFixture<WakewordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakewordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
