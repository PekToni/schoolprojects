import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../services/webdata.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any[];

  constructor(private web: WebdataService) { }

  getAllMessages() {
    return this.web.showAllMessages().subscribe(res => {
      this.messages = res.reverse();
    });
  }

  // asetetaan viesti luetuksi
  setRead(mid) {
    return this.web.setRead({
      id: mid,
      readstatus: true
    }).subscribe(res => console.log(res));
  }

  ngOnInit(): void {
    this.web.newMessageStatus();
    this.getAllMessages();
  }

}
