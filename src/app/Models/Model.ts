interface IAttend {
  userId?: string;
  email: string;
}

interface IMeetingCsharp {
  id?: string;
  name: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  attendees: IAttendee[];
}

interface IAddedMeetingCsharp {
  id?: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: IAttend[];
}

interface IMeeting extends IMeetBase {
  attendees: IAttend[];
}

interface ITime {
  hours: number;
  minutes: number;
}

interface IAttendee {
  applicationUserId: string;
  email: string;
}

interface IMeetBase {
  id?: string;
  name: string;
  description: string;
  date: Date;
  startTime: ITime;
  endTime: ITime;
}

interface IMeetings extends IMeetBase {
  attendees: IAttendee[];
  // HeightAndBottom?: String[];
}

export type {
  ITime,
  IAttend,
  IMeetBase,
  IAttendee,
  IMeeting,
  IMeetings,
  IMeetingCsharp,
  IAddedMeetingCsharp,
};
