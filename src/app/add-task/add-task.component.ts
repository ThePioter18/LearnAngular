import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  animations: [

    trigger('newTask', [
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
export class AddTaskComponent implements OnInit {

  addForm: FormGroup;

  constructor(private tasksService: TasksService, private authService: AuthService) {
  }

  ngOnInit() {

    this.addForm = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)])])
    });
  }

  add() {
    const tasksList = this.createTaskList();
    this.tasksService.add(tasksList);
    this.addForm = this.initForm();
  }

  createTaskList(): Array<Task> {
    const tasksList = new Array<Task>();
    const taskArr = this.addForm.get('taskName').value as [string];
    taskArr.forEach(taskName => {
      const task = { name: taskName, userId: this.authService.user.uid, created: new Date().toLocaleString(), isDone: false };
      tasksList.push(task);
    });
    return tasksList;
  }

  addField() {
    const arr = this.addForm.get('taskName') as FormArray;
    arr.push(new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]));
  }
  getValidity(i) {
    return (this.addForm.get('taskName') as FormArray).controls[i].invalid;
  }
  removeTaskField(taskNameIndex: number): void {
    (this.addForm.get('taskName') as FormArray).removeAt(taskNameIndex);
  }

}
