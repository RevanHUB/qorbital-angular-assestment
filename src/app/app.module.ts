import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ModalComponent } from './modal/modal.component';
import { SocketWebService } from './socket-web.service';
import { EmployeesComponent } from './employees/employees.component';
import { MeetingComponent } from './meeting/meeting.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalComponent,
    EmployeesComponent,
    MeetingComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [SocketWebService, EmployeesComponent, MeetingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
