import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage = '';
  successMessage = '';
  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
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
}
