import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpService: HttpService) {

    this.httpService.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
      console.log(list);
    });

  }

  add(task: Task) {
    const list = this.tasksListObs.getValue();
    list.push(task);
    this.tasksListObs.next(list);
  }

  remove(task: Task) {
    const list = this.tasksListObs.getValue().filter(e => e !== task);
    this.tasksListObs.next(list);
  }

  done(task: Task, index: number) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);
  }

  // metody dostępu do powyższych subjectów
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  saveTasksInDb() {
    this.httpService.saveTasks(this.tasksListObs.getValue());
  }
}
