import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: any = [];
  images: any = [];
  trailers: any = [];
  logo: string;
  info: string;
  showGallery = true;
  alertStyle: string;
  alertMessage: string;
  showImageAlert = false;
  showTrailerAlert = false;
  roles: any = ['Admin', 'Developer'];

  constructor(private web: WebdataService, private auth: AuthService) { }

  roleIsAuthorized() {
    return this.auth.roleIsAuthorised(this.roles);
  }

  getAbout() {
    return this.web.getAbout().subscribe(res => {
      this.about = res;
      this.images = this.about[1];
      this.trailers = this.about[2];
      this.logo = this.about[0].logo;
      this.info = this.about[0].about;
      console.log(this.trailers);
      console.log(this.images);
    });
  }

  removeImageFromGallery(id) {
    this.web.removeImageFromGallery(id).subscribe(res => {
      this.getAbout();
      this.showImageAlert = true;
      this.showTrailerAlert = false;
      if (res.success) {
        this.alert('success', res.message);
      } else if (res.success === false) {
        this.alert('wrong', res.message);
      }
    });
  }

  removeTrailerFromGallery(id) {
    this.web.removeTrailerFromGallery(id).subscribe(res => {
      this.showImageAlert = false;
      this.showTrailerAlert = true;
      this.getAbout();
      if (res.success) {
        this.alert('success', res.message);
      } else if (res.success === false) {
        this.alert('wrong', res.message);
      }
    })
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
    this.getAbout();
  }

}
