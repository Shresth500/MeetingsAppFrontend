import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  NgForm,
  ValidationErrors,
} from '@angular/forms';

import { JsonPipe } from '@angular/common';
import {
  NgbDatepicker,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MeetingsService } from '../../../meetings.service';
import { AuthService } from '../../../../../common/auth/auth.service';
import { UserService, IUser } from '../../../../../User/user.service';
import { SessionListComponent } from '../../meetingSession/session-list/session-list.component';
import {
  IAddedMeetingCsharp,
  IAttend,
  IMeetBase,
  IMeeting,
  IMeetingCsharp,
  ITime,
} from '../../../../../Models/Model';
import { min } from 'rxjs';

function checkStartAndEndTime(
  control: AbstractControl
): ValidationErrors | null {
  const startTimeHours = control.get('startTime')?.value.hours;
  const startTimeMinutes = control.get('startTime')?.value.minutes;
  const endTimeHours = control.get('endTime')?.value.hours;
  const endTimeMinutes = control.get('endTime')?.value.minutes;

  if (
    startTimeHours * 60 + startTimeMinutes <=
    endTimeHours * 60 + endTimeMinutes
  )
    return null;

  return {
    TimeError: 'Start Time is greater than end Time',
  };
}

function NameCheck(control: AbstractControl): ValidationErrors | null {
  const Name = control.get('name')?.value;

  const regex = /^[A-Za-z0-9\s]+$/;

  if (!Name) return null;

  if (regex.test(Name)) return null;
  return { errorName: 'Name should contain letters, spaces and digits' };
}

function DescriptionCheck(control: AbstractControl): ValidationErrors | null {
  const Description = control.get('description')?.value;

  const regex = /^[A-Za-z0-9\s]+$/;

  if (!Description) return null;

  if (regex.test(Description)) return null;
  return {
    errorDescription: 'Description should contain letters, spaces and digits',
  };
}

function DateCheck(control: AbstractControl): ValidationErrors | null {
  const date = control.get('date')?.value; // Assuming date contains the year, month, and day
  const startTime = control.get('startTime')?.value; // Assuming start contains the hours and minutes
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  if (!date || !startTime) {
    return null; // Handle empty or invalid data gracefully
  }

  // Compare Year, Month, and Day
  if (date.year > currentYear) return null;
  if (date.year === currentYear && date.month - 1 > currentMonth) return null;
  if (
    date.year === currentYear &&
    date.month - 1 === currentMonth &&
    date.day > currentDay
  )
    return null;

  // If it's the current day, check hours and minutes
  if (
    date.year === currentYear &&
    date.month - 1 === currentMonth &&
    date.day === currentDay
  ) {
    // Check hours
    if (startTime.hours > currentHour) return null;
    // If the hour is the same, check minutes
    if (startTime.hours === currentHour && startTime.minutes > currentMinute)
      return null;
  }

  // If none of the above conditions are met, return an error
  return { errorDate: `Date should be after ${currentDate}` };
}

@Component({
  selector: 'app-add-meetings',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-meetings.component.html',
  styleUrl: './add-meetings.component.scss',
})
export class AddMeetingsComponent implements OnInit {
  model!: NgbDateStruct;
  registeredusers!: IUser[];
  addMeetingForm!: FormGroup;
  persons = new Map<string, string>();

  constructor(
    private fb: FormBuilder,
    private meetingApi: MeetingsService,
    private users: UserService,
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.addMeetingForm = this.fb.group(
      {
        name: ['', Validators.required],
        date: ['', Validators.required],
        startTime: this.fb.group({
          hours: [0, Validators.required],
          minutes: [0, Validators.required],
        }),
        endTime: this.fb.group({
          hours: [0, Validators.required],
          minutes: [0, Validators.required],
        }),
        description: ['', Validators.required],
        emails: ['', Validators.required],
      },
      {
        validators: [
          checkStartAndEndTime,
          NameCheck,
          DescriptionCheck,
          DateCheck,
        ],
      }
    );
  }
  ngOnInit(): void {}

  getAttendee() {
    let temp: string[] = this.addMeetingForm.value.emails.split(',');
    let attendee: IAttend[] = [];
    temp.forEach((element) => {
      let val: IAttend = {
        email: element,
      };
      attendee.push(val);
    });
    return attendee;
  }

  getTime(time: ITime): string {
    let hour: string, minutes: string;
    if (time.hours < 10) {
      hour = '0' + time.hours;
    } else {
      hour = '' + time.hours;
    }

    if (time.minutes < 10) {
      minutes = '0' + time.minutes;
    } else {
      minutes = '' + time.minutes;
    }
    let val: string = '' + hour + ':' + minutes + ':00';
    return val;
  }

  addMeeting() {
    const formValue = this.addMeetingForm.value;
    const dateOnly = new Date(
      formValue.date.year, // Ensure formValue.date has year
      formValue.date.month - 1, // Months are zero-based
      formValue.date.day + 1 // Ensure formValue.date has day
    );

    const formattedDate = dateOnly.toISOString().split('T')[0];

    console.log(formValue.date.month);
    const data: Omit<IMeeting, 'id'> = {
      name: this.addMeetingForm.value.name,
      date: new Date(formattedDate),
      startTime: this.addMeetingForm.value.startTime,
      endTime: this.addMeetingForm.value.endTime,
      description: this.addMeetingForm.value.description,
      attendees: this.getAttendee(),
    };

    console.log(data.date);

    let dateValue = data.date.toISOString().split('T')[0];
    const AddedMeet: IAddedMeetingCsharp = {
      name: data.name,
      date: dateValue,
      startTime: this.getTime(data.startTime),
      endTime: this.getTime(data.endTime),
      description: data.description,
      attendees: this.getAttendee(),
    };

    this.meetingApi.addMeet(AddedMeet).subscribe({
      next: (addedMeet) => {
        console.log(addedMeet);
        this.router.navigate(['/meetings']);
      },
    });
  }
}
