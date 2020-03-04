import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.router.navigate(['/home']);

      this.user = user;
    });
  }

  login(email: string, password: string) {
    this.angularFire.signInWithEmailAndPassword(email, password).then(user => {
    }).catch(err => {
      console.log(err);
    });
  }
  signup(email: string, password: string) {
    this.angularFire.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    }).catch(err => {
      console.log(err);
    });
  }

  logout() {
    this.angularFire.signOut();
  }
}
