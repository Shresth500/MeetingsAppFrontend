import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../common/auth/auth.guard';
import { CalendarComponent } from './Calendar/calendar/calendar.component';
import { MeetingsComponent } from './Meetings/meetings/meetings.component';
import { TeamsComponent } from './Teams/teams/teams.component';
import { AddMeetingsComponent } from './Meetings/meetings/addMeetings/add-meetings/add-meetings.component';
import { MeetingSessionComponent } from './Meetings/meetings/meetingSession/meeting-session/meeting-session.component';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'prefix',
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard],
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
        canActivate: [authGuard],
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
      },
      /*
      {
        path: 'meetings',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./Meetings/meetings.routes').then((m) => m.parentRoutes),
      },*/
      /*
      {
        path: 'meetings',
        loadComponent: () =>
          import('./Meetings/meetings/meetings.component').then(
            (m) => m.MeetingsComponent
          ),
        //component: MeetingsComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./Meetings/meetings.routes').then((m) => m.parentRoutes),
          },
          /*
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
      {
        path: 'teams',
        component: TeamsComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
