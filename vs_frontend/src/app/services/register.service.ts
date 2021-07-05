import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Webuser } from '../models/webuser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  backendUrl = 'http://localhost:3002/webusers/';

  register(regform: any): Observable<any> {
    const url = this.backendUrl + 'register';
    const headers = {headers: new HttpHeaders({'Content-type': 'application/json'})};
    return this.http.post<Webuser>(url, regform, headers);
  }
  constructor(private http: HttpClient) { }
}
