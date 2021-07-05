import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-teamedit',
  templateUrl: './teamedit.component.html',
  styleUrls: ['./teamedit.component.css']
})
export class TeameditComponent implements OnInit {

  teamForm: FormGroup;
  alertStyle: string;
  alertMessage: string;

  constructor(private web: WebdataService, private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      image: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required)
    });
   }

  // haetaan tiimitiedot
  getTeam() {
    return this.web.getTeam().subscribe(res => {
      this.teamForm.patchValue({about: res[0].about});
    });
  }

  // kuvan vaihtoeventti
  onImageChanged(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.teamForm.get('image').setValue(image);
    }
  }

  // tiimin kuvan vaihto
  editTeamImage() {
    const formData = new FormData();
    formData.append('image', this.teamForm.get('image').value);
    return this.web.editTeamImage(formData).subscribe(res => {
      if (res.success) {
        this.alert('success', 'Succesfully updated team picture');
      } else if (res.success === false) {
        this.alert('wrong', 'Something went wrong while updating team picture');
      }
    });
  }

  // tiimin tietojen muokkaus
  editTeamAbout() {
    const about = this.teamForm.value;
    return this.web.editTeamAbout(about).subscribe(res => {
      if (res.success) {
        this.alert('success', 'Succesfully updated team information');
      } else if (res.success === false) {
        this.alert('wrong', 'Something went wrong while updating team information');
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
    this.getTeam();
  }

}
