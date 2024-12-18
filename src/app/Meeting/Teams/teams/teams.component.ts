import { Component, OnInit } from '@angular/core';
import { TeamsListComponent } from '../teams-list/teams-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamsListComponent, CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  numbers = Array.from({ length: 6 }, (_, i) => i);
  ngOnInit(): void {
    this.numbers = Array.from({ length: 6 }, (_, i) => i);
  }
}
