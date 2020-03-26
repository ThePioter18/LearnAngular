import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskDoc: AngularFirestoreDocument<Task>;
  tasksCollection: AngularFirestoreCollection<Task>;

  private tasksList: any;
  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private angularFire: AngularFireAuth, private db: AngularFirestore, private authService: AuthService) {

    this.angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.tasksListObs.next([]);
      }
    });

  }

  init() {
    this.tasksCollection = this.db.collection<Task>('tasks');

    this.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });
  }

  add(task: Array<Task>) {
    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);

    // Firebase/add
    for (const value of task.values()) {
      this.tasksCollection.add(value);
    }
  }

  remove(task: Task) {
    const list = this.tasksListObs.getValue().filter(e => e !== task);
    this.tasksListObs.next(list);

    // Firebase/remove
    this.taskDoc = this.db.doc(`tasks/${task.id}`);
    this.taskDoc.delete();
  }

  updateTask(task: Task) {
    // Firebase/update
    this.taskDoc = this.db.doc(`tasks/${task.id}`);
    this.taskDoc.update(task);
  }

  done(task: Task, index: number) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);

    // Firebase/add/done-task
    this.tasksCollection.add(task);

  }

  // getTasks
  getTasks() {
    const uid = this.authService.user.uid;

    this.tasksList = this.db.collection('tasks', ref => ref.where('userId', '==', uid)).snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {

          return ({
            id: doc.payload.doc.id,
            // tslint:disable-next-line: no-string-literal
            userId: doc.payload.doc.data()['userId'],
            // tslint:disable-next-line: no-string-literal
            name: doc.payload.doc.data()['name'],
            // tslint:disable-next-line: no-string-literal
            created: doc.payload.doc.data()['created'],
            // tslint:disable-next-line: no-string-literal
            end: doc.payload.doc.data()['end'],
            // tslint:disable-next-line: no-string-literal
            isDone: doc.payload.doc.data()['isDone']

          }
            // doc
          );
        });
      }));
    return this.tasksList;
  }
  // metody dostępu do powyższych subjectów
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

}
