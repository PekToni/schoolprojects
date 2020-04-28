import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Message } from './message';
import { Reply } from './reply';

const headers = {headers: new HttpHeaders({'Content-type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private backendUrl = 'http://localhost:3002/message';

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    return (error.message || error);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.backendUrl).pipe(catchError(this.handleError));
  }

  newMessage(message: any): Observable<Message> {
    const url = `${this.backendUrl}/addmessage`;
    const token = sessionStorage.getItem('accesstoken');
    message.token = token;
    return this.http.post<Message>(url, message, headers)
    .pipe(catchError(this.handleError));
  }

  replyMessage(message: any, messageId: string): Observable<Reply> {
    const url = `${this.backendUrl}/addmessage/${messageId}`;
    const token = sessionStorage.getItem('accesstoken');
    message.token = token;
    return this.http.post<Reply>(url, message, headers)
    .pipe(catchError(this.handleError));
  }

  deleteMessage(messageId: any): Observable<Message> {
    const token = sessionStorage.getItem('accesstoken');
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': token })};
    const url = `${this.backendUrl}/${messageId}`;
    return this.http.delete<Message>(url, tokenheaders)
    .pipe(catchError(this.handleError));
  }

  deleteReply(messageId: any, replyId: any): Observable<Reply> {
    const token = sessionStorage.getItem('accesstoken');
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': token })};
    console.log(tokenheaders);
    const url = `${this.backendUrl}/${messageId}/${replyId}`;
    return this.http.put<Reply>(url, null, tokenheaders)
    .pipe(catchError(this.handleError));
  }

  modifyMessage(message: any, messageId: any): Observable<Message> {
    const url = `${this.backendUrl}/${messageId}`;
    const token = sessionStorage.getItem('accesstoken');
    message.token = token;
    return this.http.put<Message>(url, message, headers)
    .pipe(catchError(this.handleError));
  }

  modifyReply(reply: any, messageId: any, replyId: any): Observable<Reply> {
    const url = `${this.backendUrl}/modifyreply/${messageId}/${replyId}`;
    const token = sessionStorage.getItem('accesstoken');
    reply.token = token;
    return this.http.put<Reply>(url, reply, headers)
    .pipe(catchError(this.handleError));
  }

}
