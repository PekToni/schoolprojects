import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { Contact } from '../../models/contact';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: Contact;

  constructor(private web: WebdataService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.message = this.route.snapshot.data.message[0];
    this.web.newMessageStatus();
  }

}
