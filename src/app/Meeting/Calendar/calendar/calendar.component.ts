import { Component, OnInit } from '@angular/core';
import {
  NgbDatepicker,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../calendar.service';
import { end, start } from '@popperjs/core';
import { months } from '../../../Models/MonthsData';
import { IAttendee, IMeetings } from '../../../Models/Model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgbModule, FormsModule, NgbProgressbarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  model!: NgbDateStruct;
  calendarMeeting: IMeetings[] = [];
  /*
  meetings: IMeetings[] = [
    {
      _id: '345678901234567890123417',
      date: new Date('2020-10-28T00:00:00.000Z'),
      name: 'User profile pic - Presentation',
      description:
        'Presentation on implementation of S3 profile pic edit and upload requirements',
      startTime: { hours: 1, minutes: 0 },
      endTime: { hours: 2, minutes: 0 },
      attendees: [
        {
          email: 'dhruv@example.com',
          userId: '123456789012345678901251',
        },
      ],
    },
    {
      _id: '345678901234567890123417',
      name: 'User profile pic - Presentation',
      date: new Date('2020-10-28T00:00:00.000Z'),
      description:
        'Presentation on implementation of S3 profile pic edit and upload requirements',
      attendees: [
        {
          email: 'dhruv@example.com',
          userId: '123456789012345678901251',
        },
      ],
      startTime: { hours: 5, minutes: 30 },
      endTime: { hours: 6, minutes: 30 },
    },
    {
      _id: '345678901234567890123417',
      name: 'User profile pic - Presentation',
      date: new Date('2020-10-28T00:00:00.000Z'),
      description:
        'Presentation on implementation of S3 profile pic edit and upload requirements',
      attendees: [
        {
          email: 'dhruv@example.com',
          userId: '123456789012345678901251',
        },
      ],
      startTime: { hours: 8, minutes: 0 },
      endTime: { hours: 9, minutes: 30 },
    },
  ];
  */

  attendees: IAttendee[] = [];
  Height: String = '0';
  Bottom: String = '0';
  HourMapData = new Map<string, IMeetings[]>();

  HourMap = new Map<string, String[]>();
  MeetingsInfo = new Map<string, IMeetings>();

  intervals = Array.from({ length: 24 }, (_, i) => ({
    start: `${i.toString().padStart(2, '0')}:00`,
    end: `${(i + 1).toString().padStart(2, '0')}:00`,
  }));

  ngOnInit(): void {
    for (let interval of this.intervals) {
      let [hours, minutes] = interval.start.split(':').map(Number);
      let val: IMeetings[] = [];
      this.HourMapData.set('' + hours, val);
    }
    this.HourMapData.clear();
    // this.HourMap.clear();
    // this.MeetingsInfo.clear();
    const today = new Date();
    this.model = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // Months are zero-based in JavaScript Date.
      day: today.getDate(),
    };
    let date = new Date(this.model.year, this.model.month - 1, this.model.day);
    let formattedDate = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
    this.getData(formattedDate);
  }

  constructor(private calendarData: CalendarService) {}
  onInputChange(event: { year: number; month: number; day: number }) {
    this.HourMapData.clear();
    // this.HourMap.clear();
    // this.MeetingsInfo.clear();
    if (
      event &&
      event.year > 1900 &&
      event.month >= 1 &&
      event.month <= 12 &&
      event.day >= 1 &&
      event.day <= 31
    ) {
      console.log(event.year); // Access the year property
      console.log(event.month); // Access the month
      console.log(event.day); // Access the day
      let date = new Date(event.year, event.month - 1, event.day);
      console.log(date);
      let formattedDate = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
      console.log(formattedDate);
      this.getData(formattedDate);
    }
  }

  getData(date: string) {
    this.calendarData.getCalendarfromDate(date).subscribe({
      next: (calendarData) => {
        this.calendarMeeting = calendarData;
        console.log(calendarData);
        this.updateTimeline();
      },
    });
  }

  /*
  updateTimeline(): void {
    for (let item of this.calendarMeeting) {
      let val1 = new String(this.calculateBottomOffset(item)),
        val2 = new String(this.calculateHeight(item));
      let v: String[] = [val1, val2];
      this.HourMap.set('' + item.startTime.hours, v);
      this.MeetingsInfo.set('' + item.startTime.hours, item);
    }
    for (let item of this.MeetingsInfo) {
      console.log(item);
    }
  }
  convertToMinutes(time: { hours: number; minutes: number }): number {
    const hours = time.hours,
      minutes = time.minutes;
    return hours * 60 + minutes;
  }

  isTimelineInInterval(timeline: { start: string; end: string }): boolean {
    let [hours, minutes] = timeline.start.split(':').map(Number);
    if (this.HourMap.get('' + hours)) {
      return true;
    }
    return false;
  }

  getBottom(timeline: { start: string; end: string }) {
    let [hours, minutes] = timeline.start.split(':').map(Number);
    if (this.HourMap.get('' + hours) !== undefined) {
      return this.HourMap.get('' + hours)?.[0];
    }
    return '';
  }

  getHeight(timeline: { start: string; end: string }) {
    let [hours, minutes] = timeline.start.split(':').map(Number);
    if (this.HourMap.get('' + hours) !== undefined) {
      return this.HourMap.get('' + hours)?.[1];
    }
    return '';
  }

  calculateBottomOffset(timeline: IMeetings): number {
    const startMinutes = this.convertToMinutes(timeline.startTime);
    let intervalStartHour = timeline.startTime.hours,
      intervalStartMinutes = timeline.startTime.minutes;

    intervalStartMinutes = intervalStartHour * 60;
    if (startMinutes < intervalStartMinutes) {
      return 0; // Starts before the interval
    }

    return ((startMinutes - intervalStartMinutes) / 60) * 100 + 18;
  }

  calculateHeight(timeline: IMeetings): number {
    const startMinutes = this.convertToMinutes(timeline.startTime);
    const endMinutes = this.convertToMinutes(timeline.endTime);

    let numberOfBlocks = (endMinutes - startMinutes) / 60;

    //const val = (numberOfBlocks + (numberOfBlocks - 1) / 5) * 100;
    const val = numberOfBlocks * 100;
    //console.log(startMinutes + ' ' + endMinutes + ' ' + val);
    return val + 20;
  }
    */

  getMonths(): string {
    return months[this.model.month - 1];
  }
  /*
  getName(interval: { start: string; end: string }) {
    const [hours, minute] = interval.start.split(':').map(Number);
    if (this.MeetingsInfo.get('' + hours)) {
      if (this.MeetingsInfo.get('' + hours)?.attendees !== undefined)
        this.attendees = this.MeetingsInfo.get('' + hours)?.attendees;
      return this.MeetingsInfo.get('' + hours)?.name;
    }
    return '';
  }
    */

  convertToMinutes(time: { hours: number; minutes: number }): number {
    const hours = time.hours,
      minutes = time.minutes;
    return hours * 60 + minutes;
  }

  calculateBottomOffset(timeline: IMeetings): number {
    const startMinutes = this.convertToMinutes(timeline.startTime);
    let intervalStartHour = timeline.startTime.hours,
      intervalStartMinutes = timeline.startTime.minutes;

    intervalStartMinutes = intervalStartHour * 60;
    if (startMinutes < intervalStartMinutes) {
      return 0; // Starts before the interval
    }

    return ((startMinutes - intervalStartMinutes) / 60) * 100;
  }

  calculateHeight(timeline: IMeetings): number {
    const startMinutes = this.convertToMinutes(timeline.startTime);
    const endMinutes = this.convertToMinutes(timeline.endTime);

    let numberOfBlocks = (endMinutes - startMinutes) / 60;

    //const val = (numberOfBlocks + (numberOfBlocks - 1) / 5) * 100;
    const val = numberOfBlocks * 100;
    //console.log(startMinutes + ' ' + endMinutes + ' ' + val);
    return val + 10 * numberOfBlocks;
  }

  updateTimeline(): void {
    for (let item of this.calendarMeeting) {
      let val1 = new String(this.calculateBottomOffset(item)),
        val2 = new String(this.calculateHeight(item));
      let v: String[] = [val1, val2];
      if (this.HourMapData.has('' + item.startTime.hours) === true) {
        var arrayOfString = this.HourMapData.get('' + item.startTime.hours);
        arrayOfString?.push(item);
        if (arrayOfString)
          this.HourMapData.set('' + item.startTime.hours, arrayOfString);
      } else {
        this.HourMapData.set('' + item.startTime.hours, [item]);
      }
    }
  }
  isTimelineInInterval(interval: { start: string; end: string }): boolean {
    let [hours, minutes] = interval.start.split(':').map(Number);
    if (this.HourMapData.get('' + hours)?.length) {
      return true;
    }
    return false;
  }

  getBottom(calendarValue: IMeetings): String {
    if (calendarValue) return '' + this.calculateBottomOffset(calendarValue);
    return '0';
  }

  getHeight(calendarValue: IMeetings): String {
    if (calendarValue) {
      return '' + this.calculateHeight(calendarValue);
    }
    return '0';
  }

  getCalendarData(interval: {
    start: string;
    end: string;
  }): IMeetings[] | undefined {
    let [hours, minutes] = interval.start.split(':').map(Number);
    return this.HourMapData.get('' + hours);
  }

  getName(calendar: IMeetings): string {
    this.attendees = calendar.attendees;
    return calendar.name;
  }
}
