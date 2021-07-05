import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WebdataService } from '../../services/webdata.service';
import { Role } from '../../models/role';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn: boolean;
  newMessages: boolean;
  messageSub: Subscription;
  logSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private web: WebdataService) {
    this.logSub = this.auth.loggedIn().subscribe(val => this.loggedIn = val);
    this.messageSub = this.web.getNewMessageState().subscribe(res => {
      this.newMessages = res;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  roleIsAuthorized() {
    return this.auth.roleIsAuthorised([Role.Admin, Role.Developer]);
  }

  userIsAuthorized() {
    return this.auth.roleIsAuthorised([Role.User, Role.Admin, Role.Developer]);
  }

  devIsAuthorized() {
    return this.auth.roleIsAuthorised([Role.Developer]);
  }

  adminIsAuthorized() {
    return this.auth.roleIsAuthorised([Role.Admin]);
  }

  newMessageStatus() {
    return this.web.newMessages().subscribe(res => {
      if (res.success) {
        this.newMessages = true;
      } else if (res.success === false) {
        this.newMessages = false;
      }
    });
  }

  ngOnInit() {
  }
}
