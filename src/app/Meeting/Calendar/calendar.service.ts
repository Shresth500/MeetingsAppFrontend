import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/auth/auth.service';
import { IMeetingCsharp, IMeetings } from '../../Models/Model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  apiUrl = `https://localhost:7181/api/calendar`;
  constructor(private http: HttpClient, private auth: AuthService) {}

  private transformTime(time: string): { hours: number; minutes: number } {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return { hours, minutes };
  }
  getCalendarfromDate(date: string) {
    return this.http
      .get<IMeetingCsharp[]>(`${this.apiUrl}?meetingDate=${date}`)
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
}
