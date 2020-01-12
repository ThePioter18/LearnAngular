import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, children: [

      { path: 'add', component: AddTaskComponent },
      { path: 'todo', component: TodoTaskComponent },
      { path: 'done', component: DoneTaskComponent }

    ]

  },
  {
    path: 'about/:id',
    component: AboutComponent
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
    DateDirective
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
