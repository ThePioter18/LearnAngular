import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage = '';
  successMessage = '';
  tabIndex = 1;

  navLinks = [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  constructor(public authService: AuthService, public router: Router) { }


  // metoda rejestracji
  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password).then(() => {

      this.errorMessage = '';
      this.successMessage = 'Twoje konto zostało utworzone';

    },
      err => {
        console.log(err);
        this.successMessage = '';
        switch (err.code) {
          case 'auth/weak-password': {
            err.message = 'Hasło powinno mieć co najmniej 6 znaków';
            this.errorMessage = err.message;
            return this.errorMessage;
          }
          case 'auth/invalid-email': {
            err.message = 'Źle sformatowany e-mail.';
            this.errorMessage = err.message;
            return this.errorMessage;
          }
          case 'auth/email-already-in-use': {
            err.message = 'Adres e-mail jest już używany przez inne konto.';
            this.errorMessage = err.message;
            return this.errorMessage;
          }
          default: {
            err.message = 'Spróbuj póżniej.';
            this.errorMessage = err.message;
            return this.errorMessage;
          }
        }
      }
    );
  }


  public transitionBtnTab() {

    this.router.navigate(['login']);

  }
}
