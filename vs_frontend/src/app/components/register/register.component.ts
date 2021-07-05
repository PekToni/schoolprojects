import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  pwMatch = true;
  alertStyle: string;
  alertMessage: string;
  showForm = true;

  constructor(private fb: FormBuilder, private reg: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      userid: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    });
  }

  // rekisteröidään formin data
  onSubmit() {
    const user = this.registerForm.value;
    if (user.password === user.repassword) {
      this.reg.register({
        userid: user.userid,
        password: user.password,
        email: user.email,
        gameid: null
      }).subscribe(result => {
        if (result.success) {
          this.alert('success', result.message);
          this.showForm = false;
        } else if (result.success === false) {
          this.alert('wrong', result.message);
        }
      });
    } else {
      this.pwMatch = false;
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
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
