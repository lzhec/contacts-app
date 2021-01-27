import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { DynamicFieldComponent } from './shared/dynamicForms/dynamic-field/dynamic-field.component';
import { DynamicFormComponent } from './shared/dynamicForms/dynamic-form/dynamic-form.component';
import { UserService } from './shared/services/user.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AppDataService } from './shared/services/app-data.service';
import { UserApi } from './user/user-api';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyComponent } from './shared/body/body.component';
import { ContentComponent } from './shared/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    SignInComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    ContactListComponent,
    ContactDetailComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    {
      provide: UserApi, useExisting: UserService
    },
    AuthGuardService,
    AppDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
