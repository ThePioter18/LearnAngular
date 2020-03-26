import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  animations: [

    trigger('tasksList', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })

      ])
    ])
  ]
})
export class TodoTaskComponent {

  // @Input()
  // tasksList = [];
  // @Output()
  // emitDone = new EventEmitter<string>();
  // @Output()
  // emitRemove = new EventEmitter<string>();
  tasksList: Array<Task> = [];
  editState = false;
  taskToEdit: Task;

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks.filter(t => t.isDone === false);
    });
  }

  remove(task: Task) {
    // this.emitRemove.emit(task);
    const response = confirm('Czy na pewno chcesz usunąć?');
    if (response) {
      this.tasksService.remove(task);
    }
  }
  editTask(task: Task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
  }
  updateTask(task: Task) {
    this.tasksService.updateTask(task);
    this.taskToEdit = null;
    this.editState = false;
  }
  done(task: Task, index: number) {
    // this.emitDone.emit(task);
    this.tasksService.remove(task);
    this.tasksService.done(task, index);

  }
  getColor(): string {
    return this.tasksList.length >= 5 ? '#dc3545' : '#28a745';
  }
}
