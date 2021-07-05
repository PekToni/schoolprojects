import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WebdataService } from '../../services/webdata.service';

@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {

  gameidForm: FormGroup;
  alertMessage: string;
  alertStyle: string;

  constructor(private fb: FormBuilder, private web: WebdataService) {
    this.gameidForm = this.fb.group({
      gameid: new FormControl('', Validators.required)
    });
  }

  get gameidFormControl() {
    return this.gameidForm.controls;
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

  onSubmit() {
    const gameinfo = this.gameidForm.value;
    return this.web.addGameForUser(gameinfo).subscribe(res => {
      if (res.success) {
        this.alert('success', res.message);
      } else if (res.success === false) {
        this.alert('wrong', res.message);
      }
    });
  }

  ngOnInit(): void {
  }

}
