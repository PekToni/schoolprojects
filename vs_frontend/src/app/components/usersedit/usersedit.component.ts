import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { Playerslist } from '../../models/playerslist';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usersedit',
  templateUrl: './usersedit.component.html',
  styleUrls: ['./usersedit.component.css']
})
export class UserseditComponent implements OnInit {

  userForm: FormGroup;
  webusers: Playerslist[];
  role: any[] = ['User', 'Developer', 'Admin'];
  userRole: string;
  alertStyle: string;
  alertMessage: string;

  constructor(private web: WebdataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userid: new FormControl(''),
      role: new FormControl('')
    });
   }

  showRole() {
    for (const i of this.webusers) {
      this.userForm.patchValue({role: i.role});
    }
  }

  // listataan käyttäjät
  listWebusers() {
    this.web.listWebusers().subscribe(res => {
      this.webusers = res;
      // this.showRole();
    });
  }

  // käyttäjäroolin muokkaus
  editUserRole(user) {
    const userinfo = this.userForm.value;
    userinfo.userid = user.userid;
    this.web.editUserRole(userinfo).subscribe(res => {
      if (res.success) {
        this.alert('success', res.message);
      } else if (res.success === false) {
        this.alert('wrong', res.message);
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

  ngOnInit(): void {
    this.listWebusers();
  }

}
