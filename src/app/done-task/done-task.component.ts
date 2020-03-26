import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {

  tasksDone: Array<Task> = [];

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
      this.tasksDone = tasks.filter(t => t.isDone === true);

    });
  }
  remove(task: Task) {
    // this.emitRemove.emit(task);
    const response = confirm('Czy na pewno chcesz usunąć?');
    if (response) {
      this.tasksService.remove(task);
    }
  }
  ngOnInit() {
  }

}
