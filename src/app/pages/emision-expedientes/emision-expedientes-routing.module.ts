import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';


export const EmisionExpedientesRoutingModule: Routes=[
  {
    path: "",
    children: [
      {
        path: "crearexpediente",
        component: CrearExpedienteComponent
      }
    ]
},
]


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class EmisionExpedientesRoutingModule { }
