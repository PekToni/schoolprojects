import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alertMessage: string;
  alertStyle: string;
  showTemplate = true;

  constructor(private fp: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fp.group({
      userid: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login() {
    const user = this.loginForm.value;
    this.auth.login(user.userid, user.password).subscribe(res => {
      if (res) {
        this.alert('success', 'Logged in succesfully, redirecting to news in 5 seconds...');
        this.loginForm.patchValue({
          userid: '',
          password: ''
        });
        this.showTemplate = false;
        setTimeout(() => {
          this.router.navigate(['/news']);
        }, 5000);
      } else if (res === false) {
        this.alert('wrong', 'Wrong username or password');
      }

    });
  }

  // alertit
  alert(type, message) {
    if (type === 'success') {
      this.alertStyle = 'alert alert-success';
      this.alertMessage = message;
    } else if (type === 'wrong') {
      this.alertStyle = 'alert alert-danger';
      this.alertMessage = message;
    }
  }

  ngOnInit() {
  }

}
