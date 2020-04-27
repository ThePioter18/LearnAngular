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
import { UserComponent } from './auth/user/user.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { QuestionComponent } from './forum/question/question.component';
import { AnswerComponent } from './forum/answer/answer.component';
import { QuestionDialogComponent } from './forum/question/question-dialog/question-dialog.component';
import { AnswerDialogComponent } from './forum/answer/answer-dialog/answer-dialog.component';
import { AvatarDialogComponent } from './auth/avatar-dialog/avatar-dialog.component';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/* Angular Material */
import { MaterialModule } from './material.module';

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
  },
  {
    path: 'about',
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
    component: UserComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent
  },
  {
    path: 'question',
    component: QuestionComponent,

  },
  {
    path: 'answer',
    component: AnswerComponent
  }
];

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
    ProfileComponent,
    QuestionComponent,
    AnswerComponent,
    QuestionDialogComponent,
    AnswerDialogComponent,
    AvatarDialogComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    BrowserModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestionDialogComponent,
    AnswerDialogComponent,
    AvatarDialogComponent
  ]

})
export class AppModule { }
