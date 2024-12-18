import { Routes } from '@angular/router';
import { MeetingsComponent } from './meetings/meetings.component';
import { authGuard } from '../../common/auth/auth.guard';
import { MeetingSessionComponent } from './meetings/meetingSession/meeting-session/meeting-session.component';
import { AddMeetingsComponent } from './meetings/addMeetings/add-meetings/add-meetings.component';

export const parentRoutes: Routes = [
  /*{
    path: '',
    component: MeetingsComponent,
    children: [
      {
        path: '',
        component: MeetingSessionComponent,
        canActivate: [authGuard],
      },
      {
        path: 'add',
        component: AddMeetingsComponent,
        canActivate: [authGuard],
      },
    ],
  },*/
];
