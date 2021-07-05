import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.auth.userInfoValue;
    // katsotaan saadaanko käyttäjä, eli onko kirjautunut
    if (user) {
      // katsotaan onko hyväksyttävä rooli
      if (next.data.roles && !this.auth.roleIsAuthorised(next.data.roles)) {
        // jos ei nii ohjataan uutissivulle
        this.router.navigate(['news']);
        console.log('Unauthorized');
        return false;
      }
      // jos on niin pääsee haluttuun reittiin
      return true;
    }
    // jos ei ole kirjautunut, niin ohjataan kirjautumissivulle
    this.router.navigate(['login']);
    console.log('Not logged in');
    return false;
  }

}
