import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';

  constructor(public authService: AuthService) { }

  // metoda loginu
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password).then(res => {
      console.log(res);
    }, err => {
      console.log(err);

      switch (err.code) {
        case 'auth/wrong-password': {
          err.message = 'Nieprawidłowe hasło!';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        case 'auth/invalid-email': {
          err.message = 'Źle sformatowany e-mail.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        case 'auth/user-not-found': {
          err.message = 'Nie ma takiego konta.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        default: {
          return 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.';
        }
      }
    });
  }
  // metoda rejestracji
  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
  }

}
