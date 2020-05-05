import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage = '';
  successMessage = '';
  user: User;
  documentFire: AngularFirestoreDocument<any>;

  private taskIdArray = [];

  constructor(public angularFire: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    angularFire.authState.subscribe(user => {

      const login = this.router.isActive('/login', true);
      const register = this.router.isActive('/register', true);

      if (login) {
        this.router.navigate(['/home']);
      } else if (register) {
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 3000);
      }

      this.user = user;


    });



  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFire.auth.signInWithEmailAndPassword(email, password).then(
        res => {
          console.log('Co tu:', res);
          resolve(res);

        },
        err => reject(err)
      );
    });
  }
  signup(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(
        res => {
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
  logout() {
    this.angularFire.auth.signOut();
  }


  deleteAccount(value, currentPassword) {

    const credential = firebase.auth.EmailAuthProvider.credential(this.user.email, currentPassword);
    firebase.auth().currentUser.reauthenticateWithCredential(credential);

    // usunięcie nazwy i danych użytkownika posiadający ten e-mail
    this.documentFire = this.db.doc(`users/${value.id}`);
    this.documentFire.delete();

    // pobranie taskow id dla zalogowanego uzytkownika
    const taskIdCollection = this.db.collection('tasks', ref => ref.where('userId', '==', this.user.uid)).
      snapshotChanges().
      pipe(map(docArray => {
        return docArray.map(doc => {

          return ({
            id: doc.payload.doc.id,

          }
            // doc
          );
        });
      }));


    taskIdCollection.subscribe(id => {
      this.taskIdArray = id;
      if (this.taskIdArray[0] != null) {
        const taskId = this.taskIdArray[0];


        // Pobiera id taska dla zalogowanego usera

        this.db.collection('tasks').ref.get()
          .then(querySnapshot => {

            console.log('wewnatrz uid', this.user.uid);

            querySnapshot.forEach(doc => {

              if (doc.id === taskId.id) {
                doc.ref.delete();
              }

            });

          }).then(() => {
            // Delete completed!
            // ...
            console.log('Delete completed!');

          });


      }

    });


    // Usunięcie email/konto
    this.user.delete().then(() => {

      this.router.navigate(['/login']);

    }, error => {
      // An error happened.
      console.log('Błąd z usunięciem konta', error);

      switch (error.code) {
        case 'auth/requires-recent-login': {
          error.message = 'This operation is sensitive and requires recent authentication. Log in again before retrying this request';
          this.errorMessage = error.message;
          return this.errorMessage;
        }
        case 'auth/user-mismatch': {
          error.message = 'The supplied credentials do not correspond to the previously signed in user.';
          this.errorMessage = error.message;
          return this.errorMessage;
        }
        default: {
          error.message = 'Spróbuj później.';
          this.errorMessage = error.message;
          return this.errorMessage;
        }
      }

    });

  }

}
