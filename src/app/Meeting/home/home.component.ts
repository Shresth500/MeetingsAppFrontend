import { Component, inject, OnInit } from '@angular/core';
import {
  NgbAlertModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../common/auth/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgbDropdownModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbNavModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  collapsed = true;
  isLoggedIn = false;
  isNavbarCollapsed = true;
  email!: string;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // we subscribe to be notified of changes in login status
    let user = this.authenticationService.getUser();
    this.email = user.email;
  }
  logout() {
    this.authenticationService.logout();
  }
}
