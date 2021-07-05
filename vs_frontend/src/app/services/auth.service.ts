import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Webuser } from '../models/webuser';
import { Role } from '../models/role';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebdataService } from './webdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwthelper = new JwtHelperService();
  private userInfo: BehaviorSubject<any>;
  private loginSubject = new BehaviorSubject<boolean>(false);
  private user: string;

  private backEndUrl = 'http://localhost:3002/webusers';

  constructor(private http: HttpClient, private web: WebdataService) {
    if (localStorage.getItem('accesstoken')) {
      const token = JSON.parse(localStorage.getItem('accesstoken'));
      const decodedToken = this.jwthelper.decodeToken(token);
      this.userInfo = new BehaviorSubject<any>(decodedToken);
      this.loginSubject.next(true);
      if (this.userInfoValue === 'Admin' || 'Developer') {
        this.web.newMessageStatus();
      }
    } else {
      this.userInfo = new BehaviorSubject<any>({role: 'Guest'});
    }
  }

  login(userid: string, password: string) {
    return this.http.post<any>(`${this.backEndUrl}/login`, {userid, password}).pipe(map(webuser => {
      const login = webuser.success;
      if (webuser && webuser.token) {
        localStorage.setItem('accesstoken', JSON.stringify(webuser.token));
        const decodedToken = this.jwthelper.decodeToken(webuser.token);
        this.userInfo.next(decodedToken);
        this.loginSubject.next(true);
        if (this.userInfoValue === 'Admin' || 'Developer') {
          this.web.newMessageStatus();
        }
      }
      return login;
    }));
  }

  get userInfoValue(): any {
    return this.userInfo.value;
  }

  public roleIsAuthorised(roles: Role[]): boolean {
    const currentRole = this.userInfoValue.role;
    let booleans: boolean;
    if (!currentRole) { return false; }
    roles.map(res => {
      if (res === currentRole) {
        booleans = true;

      }
      if (!res === currentRole) {
        booleans = false;
      }
    });
    return booleans;
  }

  loggedIn(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('accesstoken');
    this.userInfo.next({role: 'Guest'});
    this.loginSubject.next(false);
  }

  getUser() {
    return this.userInfoValue.userid;
  }
}
