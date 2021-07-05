import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { News } from '../../models/news';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsForm: FormGroup;
  news: News[];
  alertStyle: string;
  alertMessage: string;
  roles: any = ['Admin', 'Developer'];

  constructor(private webdata: WebdataService, private fb: FormBuilder, private auth: AuthService) {
    this.newsForm = this.fb.group({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      link: new FormControl(''),
      image: new FormControl(null)
    });
  }

  roleIsAuthorized() {
    return this.auth.roleIsAuthorised(this.roles);
  }

  // haetaan formille uutisen tiedot id perusteella
  editNews(news) {
    news.editnews = !news.editnews;
    this.newsForm.patchValue({
      title: news.title,
      message: news.message,
      link: news.link,
      image: news.image
    });
  }

  closeEdit(news) {
    news.editnews = false;
  }

  // lähetetään muokattu uutinen
  onSubmit(news) {
    const formData = new FormData();
    formData.append('id', news.id);
    formData.append('title', this.newsForm.get('title').value);
    formData.append('message', this.newsForm.get('message').value);
    formData.append('link', this.newsForm.get('link').value);
    formData.append('image', this.newsForm.get('image').value);
    this.webdata.updateNews(formData).subscribe(res => {
      if (res.success) {
        this.alert('success', res.message);
      } else if (res.success === false) {
        this.alert('wrong', res.message);
      }
      news.editnews = false;
      this.getAllNews();
    });
  }

  get newsFormControl() {
    return this.newsForm.controls;
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.newsForm.get('image').setValue(image);
    }
  }

  // haetaan kaikki uutiset
  getAllNews() {
    return this.webdata.getAllNews().subscribe(res => {
      for (const i of res) {
        if (i.link === null || i.link === '') {
          i.showYt = false;
        } else {
          i.showYt = true;
        }
        if (i.image === null || i.image === '') {
          i.showImg = false;
        } else {
          i.showImg = true;
        }
      }
      this.news = res.reverse();
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
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.getAllNews();
  }
}
