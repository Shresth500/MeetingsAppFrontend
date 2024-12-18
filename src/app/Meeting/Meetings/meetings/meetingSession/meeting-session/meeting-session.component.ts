import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionListComponent } from '../session-list/session-list.component';
import { MeetingsService } from '../../../meetings.service';
import { IMeetingCsharp, IMeetings, ITime } from '../../../../../Models/Model';

@Component({
  selector: 'app-meeting-session',
  standalone: true,
  imports: [FormsModule, SessionListComponent, CommonModule],
  templateUrl: './meeting-session.component.html',
  styleUrl: './meeting-session.component.scss',
})
export class MeetingSessionComponent implements OnInit {
  selectedValue: '' | 'all' | 'past' | 'present' | 'future' = 'all';
  searchText = '';
  meetingsList!: IMeetings[];
  meetings!: IMeetingCsharp[];
  filteredMeetingList!: IMeetings[];
  constructor(private meetingsApi: MeetingsService) {
    console.log('meeting sessions');
  }
  ngOnInit(): void {
    this.getMeetingsData(this.selectedValue, this.searchText);
  }

  SearchMeet(form: NgForm) {
    let formValue = { ...form.value };
    this.getMeetingsData(formValue.date, formValue.search);
  }

  getTime(interval: string): ITime {
    let [hours, minutes, seconds] = interval.split(':').map(Number);
    let val: ITime = {
      hours: hours,
      minutes: minutes,
    };
    return val;
  }

  getMeetingsData(
    date: '' | 'all' | 'past' | 'present' | 'future',
    searchValue: string
  ) {
    this.meetingsApi.getMeetingList(date, searchValue).subscribe({
      next: (sessions) => {
        this.meetingsList = [...sessions];
        this.filteredMeetingList = this.meetingsList;
        console.log(this.meetingsList);
      },
    });
  }

  addMember(idData: { _id: string; userId: string }) {
    console.log('id = ' + idData._id + ' userId = ' + idData.userId);
    this.meetingsApi.addAttendee(idData._id, idData.userId).subscribe({
      next: (updatedMeeting) => {
        console.log(updatedMeeting);
      },
    });
  }

  excuseFromMeeting(data: { _id: string }) {
    console.log(data);
    this.meetingsApi.excuseAttendee(data._id).subscribe({
      next: (updatedMeeting) => {
        this.filteredMeetingList = this.filteredMeetingList.filter(
          (meeting) => meeting.id != updatedMeeting.id
        );
        this.meetingsList = this.meetingsList.filter(
          (meeting) => meeting.id != updatedMeeting.id
        );
      },
    });
  }
}
