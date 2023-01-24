import { MsalService } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftLoginGuard implements CanActivate {

  constructor(
    private authService: MsalService,
    private router: Router,
    ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (this.authService.instance.getActiveAccount() == null) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
