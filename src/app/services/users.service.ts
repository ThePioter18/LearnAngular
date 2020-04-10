import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private authService: AuthService, private db: AngularFirestore, public angularFire: AngularFireAuth) {
    this.getUsers();

  }


  createUser(value) {
    return this.db.collection('users').add({
      username: value.username,
      age: value.age,
      emailUser: this.authService.user.email
    });
  }
  getUsers(): Observable<{ username: string; age: number; emailUser: string }[]> {

    return this.db.collection('users').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            // tslint:disable-next-line: no-string-literal
            username: doc.payload.doc.data()['username'],
            // tslint:disable-next-line: no-string-literal
            age: doc.payload.doc.data()['age'],
            // tslint:disable-next-line: no-string-literal
            emailUser: doc.payload.doc.data()['emailUser']
          }; // doc
        });
      })
    );
  }

  getCurrentUser() {

    const email = this.authService.user.email;

    return this.db.collection('users', ref => ref.where('emailUser', '==', email)).snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            // tslint:disable-next-line: no-string-literal
            username: doc.payload.doc.data()['username'],
          }; // doc
        });
      })
    );
    // }
  }

}
