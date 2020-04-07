import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';
import { TransformTaskPipe } from './shared/transform-task.pipe';
import { SortNamePipe } from './shared/sort-name.pipe';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { RegisterComponent } from './auth/register/register.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/*Angular Material*/
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { UserComponent } from './auth/user/user.component';
import { ProfileComponent } from './auth/profile/profile.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',

    component: HomeComponent,
    children: [
      { path: 'todo', component: TodoTaskComponent },
      { path: 'done', component: DoneTaskComponent }
    ]
  },
  {
    path: 'about/:id',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent

  }
];

const firebaseConfig = {
  apiKey: 'AIzaSyA9cvWDCklxsvY98XIkAJleJXJpaPkw1HA',
  authDomain: 'auth-d17ed.firebaseapp.com',
  databaseURL: 'https://auth-d17ed.firebaseio.com',
  projectId: 'auth-d17ed',
  storageBucket: 'auth-d17ed.appspot.com',
  messagingSenderId: '499652368751',
  appId: '1:499652368751:web:08c8150934ffca5ddf709a',
  measurementId: 'G-93CGVYFF7X'
};

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    HomeComponent,
    AboutComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
