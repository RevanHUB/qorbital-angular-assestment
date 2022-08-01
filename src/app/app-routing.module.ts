import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { MeetingComponent } from './meeting/meeting.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
    { 
    path: 'employees',
    component: EmployeesComponent
  },
   { 
    path: 'meeting',
    component: MeetingComponent
  },
  { 
    path: 'landing',
    component: LandingComponent
  },
  { 
    path: '',
    component: LandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
