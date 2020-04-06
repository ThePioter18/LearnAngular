import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  exampleForm: FormGroup;

  validationMessages = {
    username: [{
      type: 'required',
      message: 'Wymagana jest nazwa użytkownika.'
    }],
    age: [{
      type: 'required',
      message: 'Wiek jest wymagany.'
    }]
  };

  constructor(private fb: FormBuilder, private router: Router, public usersService: UsersService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
    });
  }


  resetFields() {
    this.exampleForm = this.fb.group({
      username: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.usersService.createUser(value).then(res => {
      this.resetFields();
      this.router.navigate(['/home']);
    });
  }
}
