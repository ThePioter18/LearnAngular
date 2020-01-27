import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // 'http://localhost:3000/tasks'
  localUrl = 'assets/data/db.json';

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    return this.http.get(this.localUrl).subscribe(tasks => {
      console.log(tasks);
    });
  }

}
