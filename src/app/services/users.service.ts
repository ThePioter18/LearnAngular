import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  documentFire: AngularFirestoreDocument<any>;

  constructor(private authService: AuthService, private db: AngularFirestore, public angularFire: AngularFireAuth) {
    this.getUsers();

  }

  getAvatars() {
    return this.db.collection('/avatars').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            // tslint:disable-next-line: no-string-literal
            avatar: doc.payload.doc.data()['avatar']
          }; // doc
        });
      })
    );
  }

  addAvatar(value) {
    return this.db.collection('avatars').add({
      avatar: value,
    });
  }
  removeAvatar(value) {
    // Firebase/remove
    this.documentFire = this.db.doc(`avatars/${value.id}`);
    this.documentFire.delete();
  }

  createUser(value, avatar) {
    return this.db.collection('users').add({
      username: value.username,
      age: value.age,
      emailUser: this.authService.user.email,
      avatar
    });
  }

  getUsers(): Observable<{ username: string; age: number; emailUser: string, avatar: string }[]> {

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
            emailUser: doc.payload.doc.data()['emailUser'],
            // tslint:disable-next-line: no-string-literal
            avatar: doc.payload.doc.data()['avatar']
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
            id: doc.payload.doc.id,
            // tslint:disable-next-line: no-string-literal
            username: doc.payload.doc.data()['username'],
          }; // doc
        });
      })
    );
  }

}
