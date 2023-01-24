import { AuthenticationResult } from '@azure/msal-browser';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const _scopesAzure = environment.scopesAzure;
const _me = environment.meAzure;

@Injectable({
  providedIn: 'root'
})
export class MicrosoftAuthService {

  @Output() msgResponse: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: MsalService,
    private router: Router,
    private http: HttpClient
  ) { }

  public handleRedirectPromise() {
    this.authService.instance.handleRedirectPromise().then(res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  public login() {
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);

        if (this.isLoggedIn()) {
          //Token generado por el servicio de login, al hacer la llamada al active directory
          //Este token sirve para obtener la foto de perfil del usuario
          //Es necesario activar la lectura del perfil de usuario en el app.module
          localStorage.setItem("tokenMSAL", response.accessToken);

          this.getUser();
        }
      }, error => {
        this.msgResponse.emit({ mensaje: "Error de autenticación", error: true });
      });
  }

  private isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  private getToken() {
    return this.authService.acquireTokenSilent({
      scopes: [_scopesAzure]
    }).pipe(
      map(res => res.accessToken)
    )
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  private getUser() {
    if (this.isLoggedIn()) {
      this.getToken().subscribe(async token => {
        const tokenInfo = this.getDecodedAccessToken(token);
        if (tokenInfo.roles) {
          await this.city();
          await this.department();
          await this.employeeId();
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('name', tokenInfo.name);
          localStorage.setItem('email', tokenInfo.unique_name);
          localStorage.setItem('roles', JSON.stringify(tokenInfo.roles));

          this.msgResponse.emit({ mensaje: "Inicio de sesión satisfactorio", error: false });

          this.router.navigate(['/']);
        }
        else {
          this.msgResponse.emit({ mensaje: "Sin permiso para acceder a la aplicación", error: true });
        }
      });

    }
  }

  public logout() {
    this.authService.logout();
    localStorage.clear();
  }

  public photo(): Observable<Blob> {
    const token = localStorage.getItem('tokenMSAL');

    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'image/*');
    myHeaders.append('Authorization', `Bearer ${token}`);

    return this.http
      .get(`${_me}/photo/$value`, {
        responseType: 'blob',
        headers: myHeaders,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  private city() {
    this.http.get(`${_me}/city`).subscribe(resp => {
      localStorage.setItem('city', resp['value'])
    })
  }

  private department() {
    this.http.get(`${_me}/department`).subscribe(resp => {
      localStorage.setItem('department', resp['value'])
    })
  }

  private employeeId() {
    this.http.get(`${_me}/employeeId`).subscribe(resp => {
      localStorage.setItem('employeeId', resp['value'])
    })
  }
}
