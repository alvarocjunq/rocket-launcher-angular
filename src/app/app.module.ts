import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ApiInterceptor } from './app.interceptors';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { IsAuthenticated, IsGuest } from './login/login.permissions';
import { LoginService } from './login/login.service';
import { AlertService } from './shared/alert/alert.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RocketService } from './rocket/rocket.service';
import { WebSocketService } from './app.websocket';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardControlsComponent } from './dashboard/controls/controls.component';
import { RocketModule } from './rocket/rocket.module';
import { DashboardChartsComponent } from './dashboard/charts/charts.component';
import { DashboardImageComponent } from './dashboard/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    DashboardChartsComponent,
    DashboardControlsComponent,
    DashboardImageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    /* Material imports */
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    /* App Modules */
    RocketModule,

    /* Third-party Modules */
    NgxChartsModule,
  ],
  providers: [
    IsAuthenticated,
    IsGuest,
    AlertService,
    LoginService,
    RocketService,
    WebSocketService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  entryComponents: [
    AlertComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
