import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegService {

  private backendUrl = 'http://localhost:3002/users/register';

  private isuser = true;
  private isadmin = false;

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, isuser: boolean, isadmin: boolean): Observable<void> {
    return this.http.post(this.backendUrl, {username, email, password, isuser, isadmin}).pipe(map(result => {
      console.log(result);
    }));
  }

  getUser() {
    return this.isuser;
  }

  getAdmin() {
    return this.isadmin;
  }

}
