import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MicrosoftLoginGuard } from "./pages/auth/guards/microsoft-login.guard";
import { MicrosoftRolesGuard } from './pages/auth/guards/microsoft-roles.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [MicrosoftLoginGuard, MicrosoftRolesGuard],
    //Arreglo de roles de usuario permitidos
    // data: {
    //   rolUsuario: ['Usuarios.Admin', 'Usuarios.Consulta', 'Usuarios.Lectura']
    // },
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path:'expedientes',
        loadChildren: ()  => import('./pages/emision-expedientes/emision-expedientes.module').then(m => m.EmisionExpedientesModule)
      }
      // {
      //   path: 'expedientes',
      //   loadChildren: () => import('./pages/emisionExpedientes/crea-expediente.module').then(m => m.emisionExpedientesModule)
      // }
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
