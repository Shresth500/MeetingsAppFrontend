import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  IAddedMeetingCsharp,
  IMeeting,
  IMeetingCsharp,
  IMeetings,
} from '../../Models/Model';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private apiUrl = `https://localhost:7181/api/meetings`;
  constructor(private http: HttpClient) {}

  private transformTime(time: string): { hours: number; minutes: number } {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return { hours, minutes };
  }
  getMeetingList(
    period: '' | 'all' | 'past' | 'present' | 'future',
    search: string
  ) {
    return this.http
      .get<IMeetingCsharp[]>(`${this.apiUrl}?Period=${period}&Search=${search}`)
      .pipe(
        map((meetings) =>
          meetings.map((meeting) => ({
            ...meeting,
            startTime: this.transformTime(meeting.startTime),
            endTime: this.transformTime(meeting.endTime),
          }))
        )
      );
  }

  addAttendee(_id: string, userId: string) {
    let id: number = Number.parseInt(_id);
    console.log('id ' + id + ' _id ' + _id);
    return this.http.patch<IMeetings>(
      `${this.apiUrl}/${id}?action=add_attendee&userId=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  excuseAttendee(_id: string) {
    let id: number = Number.parseInt(_id);
    return this.http.delete<IMeetings>(`${this.apiUrl}/${id}?action=remove`, {
      headers: {
        'Conten-Type': 'application/json',
      },
    });
  }

  addMeet(meet: Omit<IAddedMeetingCsharp, '_id'>) {
    console.log(meet);
    //meet.date =
    return this.http.post<IAddedMeetingCsharp>(`${this.apiUrl}/Add`, meet, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
