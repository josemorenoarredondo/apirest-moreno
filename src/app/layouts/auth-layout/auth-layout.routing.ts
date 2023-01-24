import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/pages/auth/components/login/login.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ""
  }
];
