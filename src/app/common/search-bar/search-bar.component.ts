import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWorkshop } from '../../workshops/models/IWorkshop';
import { ISessions } from '../../workshops/models/IWorkshop';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() isWrittenWorkshop: boolean = false;
  @Input() workshops!: IWorkshop[];
  @Input() filteredWorkshop!: IWorkshop[];
  @Output() workshopdata = new EventEmitter<IWorkshop[]>();

  @Input() isWrittenSession: boolean = false;
  @Input() Sessions!: Required<ISessions>[];
  @Input() filteredSessions!: Required<ISessions>[];
  @Output() sessiondata = new EventEmitter<Required<ISessions>[]>();

  filterKey: string = '';

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}
  getElement() {
    if (this.isWrittenWorkshop) {
      if (this.filterKey === '') {
        this.workshops = this.filteredWorkshop;
        this.workshopdata.emit(this.workshops);
        return;
      }
      const getWorkshops = this.workshops.filter((workshop) =>
        workshop.name.toLowerCase().includes(this.filterKey)
      );
      this.workshops = getWorkshops;
      this.workshopdata.emit(this.workshops);
    }
    if (this.isWrittenSession) {
      console.log(this.Sessions);
      console.log(this.filterKey);
      if (this.filterKey === '') {
        this.Sessions = this.filteredSessions;
        this.sessiondata.emit(this.Sessions);
        return;
      }
      const getSessions = this.Sessions.filter((sessions) =>
        sessions.name.toLowerCase().includes(this.filterKey.toLowerCase())
      );
      this.Sessions = getSessions;
      this.sessiondata.emit(this.Sessions);
    }
  }
}
