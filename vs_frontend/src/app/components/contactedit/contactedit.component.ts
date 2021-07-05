import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactedit',
  templateUrl: './contactedit.component.html',
  styleUrls: ['./contactedit.component.css']
})
export class ContacteditComponent implements OnInit {

  contactinfoForm: FormGroup;
  alertStyle: string;
  alertMessage: string;

  constructor(private web: WebdataService, private fb: FormBuilder) {
    this.contactinfoForm = this.fb.group({
      teamname: new FormControl(''),
      teamemail: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'))
    });
   }

  // haetaan formin kenttien kontrollit
  get contactinfoFormControl() {
    return this.contactinfoForm.controls;
  }

  // haetaan tiimin yhteystiedot
  getTeamContactInfo() {
    return this.web.getTeamContactInfo().subscribe(res => {
      this.contactinfoForm.patchValue({teamname: res[0].teamname});
      this.contactinfoForm.patchValue({teamemail: res[0].teamemail});
    });
  }

  // lähetetään muokatut yhteystiedot
  onSubmit() {
    const contactinfo = this.contactinfoForm.value;
    return this.web.editTeamContactInfo(contactinfo).subscribe(res => {
      if (res.success) {
        this.alert('success', 'Succesfully updated team contact info');
      } else if (res.success === false) {
        this.alert('wrong', 'Something went wrong while updating team contact info');
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
    this.getTeamContactInfo();
  }

}
