import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  tasksDone: Array<Task> = [];

  constructor(private router: Router, private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
      this.tasksDone = tasks.filter(t => t.isDone === true);
    });
  }

  sendMeHome() {
    this.router.navigate(['']);
    return false; // brak ponownego odświeżania strony
  }

}
