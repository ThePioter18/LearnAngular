import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  localUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.localUrl);
  }

  saveTasks(list: Array<Task>) {
    this.http.post(this.localUrl, list).subscribe(tasks => {
      console.log(tasks);
    });
  }

}
