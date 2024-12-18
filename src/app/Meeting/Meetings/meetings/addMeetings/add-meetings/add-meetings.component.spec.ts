import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingsComponent } from './add-meetings.component';

describe('AddMeetingsComponent', () => {
  let component: AddMeetingsComponent;
  let fixture: ComponentFixture<AddMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
