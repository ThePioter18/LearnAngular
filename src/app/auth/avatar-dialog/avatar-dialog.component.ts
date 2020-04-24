import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.css']
})

export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();
  wrongFile: string;
  url: any;
  clickSelectFile = false;
  src = '';
  clickSave = false;
  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    public usersService: UsersService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getData();
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // Size Filter Bytes
      const maxSize = 1048487;
      const allowedTypes = ['image/png', 'image/jpeg'];

      if (event.target.files[0].size > maxSize) {
        this.wrongFile = 'Za duży plik, wybierz mniejszy.';
      }

      if (!_.includes(allowedTypes, event.target.files[0].type)) {
        this.wrongFile = 'Dozwolone są tylko obrazy ( JPG | PNG )';
      }

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        this.url = image.src;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
    this.clickSelectFile = !this.clickSelectFile;
  }

  getData() {
    this.usersService.getAvatars().subscribe(data => {
      this.avatars = data;
    });
  }

  close(avatar) {
    this.dialogRef.close(avatar);
  }

  save(value) {
    this.clickSave = !this.clickSave;

    value = this.url;
    this.usersService.addAvatar(value);
  }

  removeImg(avatar) {
    this.usersService.removeAvatar(avatar);
  }

}
