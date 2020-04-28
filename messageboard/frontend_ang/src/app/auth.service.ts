import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl = 'http://localhost:3002/users/login';
  private user: string;
  public usermode: string;
  public token: string;
  private helper = new JwtHelperService();
  private Subject = new Subject<boolean>();
  private Admin = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
      return this.http.post<{token: string}>(this.backendUrl, {username, password})
      .pipe(map(res => {
        const token = res.token;
        if (token) {
          this.token = token;
          const payload = this.helper.decodeToken(token);
          if (payload.username === username && payload.isadmin === true) {
            sessionStorage.setItem('accesstoken', token);
            this.user = username;
            this.usermode = 'admin';
            this.Subject.next(true);
            this.Admin.next(true);
            return true;
          } else if (payload.username === username && payload.isuser === true) {
            sessionStorage.setItem('accesstoken', token);
            this.user = username;
            this.usermode = 'user';
            this.Subject.next(true);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout(): void {
    this.token = null;
    console.log(this.token);
    sessionStorage.removeItem('accesstoken');
    this.user = 'guest';
    this.usermode = 'guest';
  }

  // login tila navbariin
  loginMode(): Observable<boolean> {
    return this.Subject.asObservable();
  }

  // admin tila navbariin
  adminMode(): Observable<boolean> {
    return this.Admin.asObservable();
  }

  // kun sivu ladataan uudelleen, palautetaan tokenista tiedot
  onRefresh() {
    const token = sessionStorage.getItem('accesstoken');

    if (token) {
      const payload = this.helper.decodeToken(token);
      if (payload.isadmin) {
        this.user = payload.username;
        this.usermode = 'admin';
        this.Subject.next(true);
        this.Admin.next(true);
      } else if (payload.isuser) {
        this.user = payload.username;
        this.usermode = 'user';
        this.Subject.next(true);
      }
    } else {
      this.user = 'guest';
      this.usermode = 'quest';
    }
  }

  loginRemote() {
    this.Subject.next(true);
  }

}



