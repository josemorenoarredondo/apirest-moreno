import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MicrosoftAuthService } from '../../services/microsoft-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private microsoftAuthService: MicrosoftAuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.microsoftAuthService.handleRedirectPromise();
  }

  login() {
    this.microsoftAuthService.login();
    this.microsoftAuthService.msgResponse.subscribe(data => {
      if (data.error) {
        this.showNotification('danger', 'Error', data.mensaje, 'ban');
      } else {
        this.showNotification('success', 'Inicio de sesión', data.mensaje, 'user-check');
      }
    });
  }

  showNotification(type, titulo, mensaje, icon) {

    if (type === 'danger') { type = 'red' }

    this.toastr.show(
      `<span class="alert-icon fas fa-${icon}" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">${titulo}</span> <span data-notify="message">${mensaje}</span></div>`,
      '',
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass: `ngx-toastr alert alert-dismissible alert-${type} alert-notify`,
      }
    );
  }
}
