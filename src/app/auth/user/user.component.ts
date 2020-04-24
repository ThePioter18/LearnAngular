import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink = '';

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

  constructor(private fb: FormBuilder, private router: Router, public usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
    console.log(this.avatarLink);
  }

  createForm() {
    this.exampleForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.avatarLink = result.avatar;
      }
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      username: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.usersService.createUser(value, this.avatarLink).then(() => {
      this.resetFields();
      this.router.navigate(['/home']);
    });
  }
}
