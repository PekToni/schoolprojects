import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Array<Message> = [];
  user = '';
  newMessage: boolean;

  constructor(private messageService: MessageService, private auth: AuthService) {
    const token = sessionStorage.getItem('accesstoken');
    if (token) {
      this.newMessage = true;
    } else {
      this.newMessage = false;
    }
  }

  // haetaan viestit ja piilotetaan/näytetään replyviestien painike
  getMessages() {
    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      for (const message of this.messages) {
        if (message.reply.length === 0) {
          message.buttonVisible = false;
        } else {
          message.buttonVisible = true;
        }
      }
    });
  }

  // lähetetään reply viesti tietokantaan ja päivitetään lista
  replyMessage(f: NgForm, message) {
    this.messages.map(data => {
      if (data.title === message.title) {
      this.messageService.replyMessage({
          user: this.user,
          title: f.value.title,
          message: f.value.message,
        }, message._id).subscribe(reply => {
          console.log(reply);
          this.getMessages();
        });
      }
    });
  }

  // poistetaan ketju
  deleteMessage(message) {
    this.messageService.deleteMessage(message._id).subscribe(() => {
      console.log(message._id + ' deleted');
    });
  }

  // poistetaan ketjussa oleva viesti
  deleteReply(message, reply) {
    this.messageService.deleteReply(message._id, reply._id).subscribe(() => {
      console.log(reply._id + ' deleted');
      this.getMessages();
    });
  }

  // muokataan viestiä
  modifyMessage(f: NgForm, message) {
    this.messageService.modifyMessage({
      username: this.auth.getUser(),
      title: message.title,
      message: message.message
    }, message._id).subscribe(() => {
      message.edit = false;
      console.log(message._id + ' message updated');
    });
  }

  // reply viestin muokkaus
  modifyReply(f: NgForm, message, reply) {
    this.messageService.modifyReply({
      user: this.auth.getUser(),
      title: f.value.title,
      message: f.value.message
    }, message._id, reply._id).subscribe(() => {
      console.log(reply._id + ' reply updated');
      reply.edit = false;
    });
  }

  // varsinainen reply viestien näyttöpainike, muuttaa booleanin arvoa
  showReplies(reply) {
    reply.repliesVisible = !reply.repliesVisible;
  }

  // reply formin painikkeelle (myös hide painikkeelle), näytetään ja piilotetaan formi
  addReply(reply) {
    reply.addReply = !reply.addReply;
  }

  // haetaan käyttäjän nimi
  getUser() {
    this.user = this.auth.getUser();
  }

  // reply update painike
  updateReply(reply, message) {
    reply.edit = !reply.edit;
    message.repliesVisible = !message.repliesVisible;
  }

  // reply close painike
  closeModify(reply, message) {
    reply.edit = !reply.edit;
    message.repliesVisible = !message.repliesVisible;
  }

  closeModifyMessage(message) {
    message.edit = !message.edit;
  }

  messageEdit(message) {
    message.edit = !message.edit;
  }

  // haetaan käyttäjän nimi ja viestit sivun latautuessa
  ngOnInit() {
    this.auth.onRefresh();
    this.getUser();
    this.getMessages();
  }
}
