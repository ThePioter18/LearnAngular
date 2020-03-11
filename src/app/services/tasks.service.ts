import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskDoc: AngularFirestoreDocument<Task>;
  tasksCollection: AngularFirestoreCollection<Task>;

  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpService: HttpService, private db: AngularFirestore) {

    this.httpService.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });

    this.tasksCollection = this.db.collection<Task>('tasks');

  }

  add(task: Array<Task>) {
    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);

    // Firebase/add
    this.tasksCollection.add(task.values().next().value);
  }

  remove(task: Task) {
    const list = this.tasksListObs.getValue().filter(e => e !== task);
    this.tasksListObs.next(list);

    // Firebase/remove
    this.taskDoc = this.db.doc(`tasks/${task.id}`);
    this.taskDoc.delete();
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

}
