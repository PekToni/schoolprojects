import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    this.auth.login(f.value.username, f.value.password).subscribe(result => {
      if (result === true) {
        this.router.navigate(['/messages']);
      } else {
        this.error = 'Username or password incorrect';
      }
    });
  }

}
