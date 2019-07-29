import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignaturepadComponent } from './signaturepad/signaturepad.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreatJobComponent } from './creat-job/creat-job.component';
import { JobsPageComponent } from './jobs-page/jobs-page.component';
import { JobConfirmPageComponent } from './job-confirm-page/job-confirm-page.component';
import { StageOneComponent } from './stage-one/stage-one.component';
import { PersonalJobsPageComponent } from './personal-jobs-page/personal-jobs-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';


const firebaseConfig = {
  apiKey: "AIzaSyAy4Vx5HGQ82x8hCiBuPhAtxQphCq8KJDU",
  authDomain: "truckproject-b9adc.firebaseapp.com",
  databaseURL: "https://truckproject-b9adc.firebaseio.com",
  projectId: "truckproject-b9adc",
  storageBucket: "",
  messagingSenderId: "192747041888",
  appId: "1:192747041888:web:a3e175088a47deb1"
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginPageComponent,
    SignaturepadComponent,
    SignupPageComponent,
    ProfilePageComponent,
    CreatJobComponent,
    JobsPageComponent,
    JobConfirmPageComponent,
    StageOneComponent,
    PersonalJobsPageComponent,
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SignaturePadModule,
    RouterModule.forRoot([
      {path:'', component: LoginPageComponent },
      {path:'login',component:LoginPageComponent},
      {path:'signature',component:SignaturepadComponent},
      {path:'signup/:role',component:SignupPageComponent},
      {path:'profile',component:ProfilePageComponent},
      {path:'createJob/:role',component:CreatJobComponent},
      {path:'Jobs/:companyName',component:JobsPageComponent},
      {path:'JobConfirm/:contractor/:id/:companyName',component:JobConfirmPageComponent},
      {path:'StageOne/:userid/:contractor/:jobid',component:StageOneComponent},
      {path:'Ongoing',component:PersonalJobsPageComponent},
      ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
