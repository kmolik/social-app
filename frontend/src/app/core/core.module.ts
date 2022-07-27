import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    HeaderComponent
  ]
})
export class CoreModule { }
