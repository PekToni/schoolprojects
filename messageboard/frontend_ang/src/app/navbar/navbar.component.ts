import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean;
  admin: boolean;

  constructor(private auth: AuthService) {
    this.auth.loginMode().subscribe(login => this.login = login);
    this.auth.adminMode().subscribe(login => this.admin = login);
   }

  ngOnInit() {
    this.auth.onRefresh();
  }

  logout() {
    this.auth.logout();
    this.login = false;
    this.admin = false;
  }

}
