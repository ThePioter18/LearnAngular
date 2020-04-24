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

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDialogModule } from '@angular/material';
import { AnswerDialogComponent } from './forum/answer/answer-dialog/answer-dialog.component';
import { environment } from '../environments/environment';
import { AvatarDialogComponent } from './auth/avatar-dialog/avatar-dialog.component';

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
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestionDialogComponent,
    AnswerDialogComponent,
    AvatarDialogComponent
  ]

})
export class AppModule { }
