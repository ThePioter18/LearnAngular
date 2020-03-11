import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public tasksList: any;

  constructor(private db: AngularFirestore) { }

  getTasks() {
    this.tasksList = this.db.collection('tasks').snapshotChanges()
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
            isDone: doc.payload.doc.data()['isDone']
          }
            // doc
          );
        });
      }));

    return this.tasksList;
  }

}
