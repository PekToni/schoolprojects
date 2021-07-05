import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aboutedit',
  templateUrl: './aboutedit.component.html',
  styleUrls: ['./aboutedit.component.css']
})
export class AbouteditComponent implements OnInit {
  aboutForm: FormGroup;
  about: any = [];
  info: string;
  alertStyle: string;
  alertMessage: string;

  constructor(private web: WebdataService, private fb: FormBuilder) {
    this.aboutForm = this.fb.group({
      logo: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      trailer: new FormControl('', Validators.required)
    });
   }

   getAbout() {
    return this.web.getAbout().subscribe(res => {
      this.about = res;
      this.info = this.about[0].about;
      this.aboutForm.patchValue({about: this.info});
    });
  }

  // logon vaihtoeventti
  onLogoChanged(event) {
    if (event.target.files.length > 0) {
      const logo = event.target.files[0];
      this.aboutForm.get('logo').setValue(logo);
    }
  }

  // kuvan lisäyseventti
  onImageChanged(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.aboutForm.get('image').setValue(image);
    }
  }

  // vaihdetaan logo
  changeLogo() {
    const formData = new FormData();
    formData.append('image', this.aboutForm.get('logo').value);
    this.web.changeLogo(formData).subscribe(res => {
      this.alertMessages(res);
    });
  }

  // lisätään kuva galleriaan
  addImage() {
    const formData = new FormData();
    formData.append('image', this.aboutForm.get('image').value);
    this.web.addImage(formData).subscribe(res => {
      this.alertMessages(res);
    });
  }

  // vaihdetaan pelin informaatio
  changeAbout() {
    const about = this.aboutForm.value;
    this.web.changeAbout(about).subscribe(res => {
      this.alertMessages(res);
    });
  }

  // lisätään traileri
  addTrailer() {
    const trailer = this.aboutForm.controls.trailer.value;
    this.web.addTrailer({trailer}).subscribe(res => {
      this.alertMessages(res);
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

  alertMessages(res) {
    if (res.success) {
      this.alert('success', res.message);
    } else if (res.success === false) {
      this.alert('wrong', res.message);
    }
  }

  ngOnInit(): void {
    this.getAbout();
  }

}
