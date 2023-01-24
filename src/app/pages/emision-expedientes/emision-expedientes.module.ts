import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmisionExpedientesRoutingModule } from './emision-expedientes-routing.module';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CrearExpedienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmisionExpedientesRoutingModule),
    // EmisionExpedientesRoutingModule
  ]
})
export class EmisionExpedientesModule { }
