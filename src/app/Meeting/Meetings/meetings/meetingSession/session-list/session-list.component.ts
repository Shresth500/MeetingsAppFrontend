import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from '../../../../../User/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IAttendee, IMeetings } from '../../../../../Models/Model';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
})
export class SessionListComponent implements OnInit {
  @Input() meeting!: IMeetings;
  @Output() AddingMemeber = new EventEmitter<{ _id: string; userId: string }>();
  @Output() ExcuseFromMeeting = new EventEmitter<{ _id: string }>();
  selectedOption = '';
  persons = new Map<string, IUser>();
  personsInMeeting = {};
  registeredusers!: IUser[];

  constructor(private users: UserService) {}
  getNonRegisteredUsers() {
    for (let i = 0; i < this.meeting.attendees.length; i++) {
      if (this.persons.get(this.meeting.attendees[i].applicationUserId)) {
        this.persons.delete(this.meeting.attendees[i].applicationUserId);
      }
    }
    // console.log(this.persons);
    this.registeredusers = this.registeredusers.filter((user) =>
      this.persons.has(user.id)
    );
  }

  ngOnInit(): void {
    this.users.getUsers().subscribe({
      next: (registereduser) => {
        this.registeredusers = [...registereduser];

        console.log(this.registeredusers);
        for (let i = 0; i < this.registeredusers.length; i++) {
          // console.log(this.registeredusers[i]);

          console.log(this.registeredusers[i].id);
          this.persons.set(this.registeredusers[i].id, this.registeredusers[i]);
          // console.log(this.persons.get(this.registeredusers[i]._id));
        }
        console.log(this.persons);
        this.getNonRegisteredUsers();
        console.log(this.registeredusers);
      },
    });
  }

  addAttendee() {
    if (this.selectedOption === '') return;
    if (this.meeting.id) {
      const data = {
        _id: this.meeting.id,
        userId: this.selectedOption,
      };
      this.AddingMemeber.emit(data);
      //console.log(this.selectedOption);
      this.registeredusers = this.registeredusers.filter(
        (user) => this.selectedOption !== user.id
      );
      //console.log(this.registeredusers);
      let temp = this.persons.get(this.selectedOption);
      if (temp) {
        let attended: IAttendee = {
          applicationUserId: temp.id,
          email: temp?.email,
        };
        this.meeting.attendees.push(attended);
        //console.log(this.meeting.attendees);
        this.selectedOption = '';
      }
    }
  }

  excuseFromMeeting(_id: string | undefined) {
    if (_id === undefined) return;
    console.log(this.meeting.id);
    console.log(_id);
    this.ExcuseFromMeeting.emit({ _id: _id });
  }
}
