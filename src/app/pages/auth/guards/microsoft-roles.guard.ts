import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftRolesGuard implements CanActivate {

  constructor(private _router: Router) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let rol = JSON.parse(localStorage.getItem('roles'));
    
    let allow = rol.indexOf(next.data.rolUsuario) > -1;

    let permiso:boolean = false

    next.data.rolUsuario.forEach(e => {
      if(e == rol)
      permiso = true;
    });
    
    if (permiso){
      return true;
    }

    
    if (allow == false)
      this._router.navigate(['/']);

    return allow;
  }
  
}