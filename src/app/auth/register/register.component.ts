import { Component, OnInit } from '@angular/core';
import { AuthService } from 'LearnAngular/src/app/auth/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  tabIndex = 1;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  // metoda rejestracji
  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Twoje konto zostało utworzone';
    }, err => {
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
    });
  }
  public transitionBtnTab() {
    const tabCount = 2;
    this.tabIndex = (this.tabIndex + 1) % tabCount;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        registerIndex: this.tabIndex,
      }
    };
    this.router.navigate(['login'], navigationExtras);
  }
}
