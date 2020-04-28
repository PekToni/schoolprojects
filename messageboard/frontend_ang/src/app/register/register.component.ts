import { Component, OnInit } from '@angular/core';
import { RegService } from '../reg.service';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Array<User> = [];

  constructor(private reg: RegService, private router: Router, private auth: AuthService) { }

  register(f: NgForm) {
    this.reg.register(f.value.username, f.value.email, f.value.password, this.reg.getUser(), this.reg.getAdmin()).subscribe(() => {
      this.router.navigate(['/messages']);
      this.auth.loginRemote();
    });
  }

  ngOnInit() {
  }

}
