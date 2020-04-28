import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user';

const headers = {headers: new HttpHeaders({'Content-type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = 'http://localhost:3002/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl);
  }

  modifyUser(user: any, userId: any): Observable<User> {
    const url = `${this.backendUrl}/${userId}`;
    return this.http.put<User>(url, user, headers).pipe();
  }

  deleteUser(userId: any): Observable<User> {
    const url = `${this.backendUrl}/${userId}`;
    return this.http.delete<User>(url, headers);
  }

  addUser(user: any): Observable<User> {
    const url = `${this.backendUrl}/newuser`;
    console.log(user);
    return this.http.post<User>(url, user, headers);
  }

}
