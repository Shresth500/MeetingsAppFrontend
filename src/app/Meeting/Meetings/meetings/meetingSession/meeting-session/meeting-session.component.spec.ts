import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSessionComponent } from './meeting-session.component';

describe('MeetingSessionComponent', () => {
  let component: MeetingSessionComponent;
  let fixture: ComponentFixture<MeetingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
