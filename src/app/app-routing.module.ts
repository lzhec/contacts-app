import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignInComponent} from './user/sign-in/sign-in.component';
import {RegistrationComponent} from './user/registration/registration.component';
import {AuthComponent} from './auth/auth.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';
import {AuthGuardService} from './shared/services/auth-guard.service';


const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'authenticated', component: AuthComponent, canActivate: [AuthGuardService], children: [
      {path: '', canActivateChild: [AuthGuardService], children: [
          {path: '', redirectTo: 'contact-list', pathMatch: 'full'},
          {path: 'contact-list', component: ContactListComponent},
          {path: 'contact/:id/:operation', component: ContactDetailComponent},
        ]}
    ]},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: '**', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
