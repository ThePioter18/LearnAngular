import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksList: Array<Task> = [];
  private tasksDone: Array<Task> = [];

  private tasksListObs = new BehaviorSubject<Array<Task>>([]);
  private tasksDoneObs = new BehaviorSubject<Array<Task>>([]);

  constructor() {
    this.tasksList = [
      { name: 'Sprzątanie', created: new Date() },
      { name: 'Nauka Angulara', created: new Date() },
      { name: 'Podlewanie kwiatów', created: new Date() },
      { name: 'Zakupy', created: new Date()}
    ];
    this.tasksListObs.next(this.tasksList);
  }

  // changeGoal(tasksList) {
  //   this.tasksListObs.next(tasksList);
  // }

  add(task: Task) {
    this.tasksList.push(task);
    this.tasksListObs.next(this.tasksList);
  }


  remove(task: Task, index: number) {
    this.tasksList = this.tasksList.filter( (e, i) => e !== task || i !== index);
   // każdy element oznaczony jak 'e' i sprawdzamy czy jest różny
   // od tego taska co przechodzi w tablicy, jesli warunek sprawdzony bedzie mial 'true'
   // to filtr zachowa elementy, jesli 'false' to usunie.
   // zachowane elementy tworzą spowrotem nową tablicę,
   // więc
   // najlepiej przypisac do naszej tablicy tą nową tablice stworzona przez filter
   // this.tasksList.splice(index, 1);
    this.tasksListObs.next(this.tasksList);
  }
  done(task: Task, index: number) {
    this.tasksDone.push(task); // dodajemy zrobione zadanie do tablicy 'task'
    this.remove(task, index); // Po dodaniu do listy zadan zrobionych, usuwamy zad ze starej listy
    this.tasksDoneObs.next(this.tasksDone);
  }

  // metody dostępu do powyższych subjectów
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }
  getTasksDoneObs(): Observable<Array<Task>> {
    return this.tasksDoneObs.asObservable();
  }

}
