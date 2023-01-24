import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AuthRoutes } from './auth.routing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(AuthRoutes),
    
  ]
})
export class AuthModule { }
