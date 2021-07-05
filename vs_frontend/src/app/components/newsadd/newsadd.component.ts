import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WebdataService } from '../../services/webdata.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsadd',
  templateUrl: './newsadd.component.html',
  styleUrls: ['./newsadd.component.css']
})
export class NewsaddComponent implements OnInit {

  newsForm: FormGroup;
  user = this.auth.getUser();

  constructor(private fb: FormBuilder, private web: WebdataService, private auth: AuthService, private router: Router) {
    this.newsForm = this.fb.group({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      link: new FormControl(''),
      image: new FormControl(null)
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

  onSubmit() {
    const news = this.newsForm.value;
    const formData = new FormData();

    formData.append('title', this.newsForm.get('title').value);
    formData.append('message', this.newsForm.get('message').value);
    formData.append('userid', this.auth.getUser());
    formData.append('link', this.newsForm.get('link').value);
    formData.append('image', this.newsForm.get('image').value);

    this.web.addNews(formData).subscribe(res => {
      this.router.navigate(['news']);
    });
  }

  ngOnInit(): void {
  }

}
