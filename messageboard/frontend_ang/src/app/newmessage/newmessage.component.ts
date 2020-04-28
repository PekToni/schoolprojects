import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newmessage',
  templateUrl: './newmessage.component.html',
  styleUrls: ['./newmessage.component.css']
})
export class NewmessageComponent implements OnInit {

  reply = [];
  user = '';

  constructor(private messageService: MessageService, private router: Router, private auth: AuthService) { }

  newMessage(f: NgForm) {
    this.messageService.newMessage({
      user: this.user,
      title: f.value.title,
      message: f.value.message,
      reply: this.reply
    }).subscribe(data => {
      if (data) {
        this.router.navigate(['/']);
      }
    });
  }

  getUser() {
    this.user =  this.auth.getUser();
  }

  ngOnInit() {
    this.getUser();
  }

}
