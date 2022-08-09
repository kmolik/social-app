import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import {authInterceptorProviders} from "./core/authentication/helpers/auth.interceptor";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transports: ['websocket']
  }
};

const modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  NoopAnimationsModule,
  CoreModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...modules,
    SocketIoModule.forRoot(config)
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
