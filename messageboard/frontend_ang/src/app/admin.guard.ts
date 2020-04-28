import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private helper = new JwtHelperService();

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAdmin();
  }
  checkAdmin(): boolean {
    const token = sessionStorage.getItem('accesstoken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
      }
    const payload = this.helper.decodeToken(token);
    if (!payload.isadmin) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
