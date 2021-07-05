import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  teamname: string;
  teamemail: string;
  alertMessage: string;
  alertStyle: string;
  contactForm: FormGroup;
  messageSended = false;
  message: any;


  constructor(private web: WebdataService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
   }

  // haetaan tiimin yhteystiedot
  getTeamContactInfo() {
    return this.web.getTeamContactInfo().subscribe(res => {
      this.teamname = res[0].teamname;
      this.teamemail = res[0].teamemail;
    });
  }

  // haetaan formin kenttien kontrollit
  get contactFormControl() {
    return this.contactForm.controls;
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

  // lähetetään viesti
  onSubmit() {
    const message = this.contactForm.value;
    return this.web.createContactMessage(message).subscribe(res => {
      this.messageSended = true;
      if (res.success) {
        this.alert('success', res.message);
        this.message = res.data;
        this.web.newMessageStatus();
      } else if (res.success === false) {
        this.alert('wrong', res.message);
      }
    });
  }

  ngOnInit() {
    this.getTeamContactInfo();
  }

}
