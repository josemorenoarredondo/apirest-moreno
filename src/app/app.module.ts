import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';

//Azure
import { MSAL_INSTANCE, MsalService, MsalInterceptor, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { environment } from 'src/environments/environment';
import { MicrosoftAuthService } from "./pages/auth/services/microsoft-auth.service";

const _apiUrl = environment.apiUrl;

//Azure variables
const _redirectAplicationAzure = environment.redirectAplicationAzure;
const _scopesAzure = environment.scopesAzure;
const _clientIdAzure = environment.clientIdAzure;
const _authorityAzure = environment.authorityAzure;
const _me = environment.meAzure;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: _clientIdAzure,
      authority: _authorityAzure,
      redirectUri: _redirectAplicationAzure,
    },

  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  protectedResourceMap.set(_me, ['user.read']);
  protectedResourceMap.set(_apiUrl, [_scopesAzure]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({preventDuplicates: true}),
    CollapseModule.forRoot(),
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }, {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    }, {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MicrosoftAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
