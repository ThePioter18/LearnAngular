import { UsersService } from './../../../services/users.service';
import { QUERY } from './../../../models/data-base';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent {
  newQuestion: Question[] = QUERY;

  name: Array<{ username: string; }> = [];

  currentAuthor: string;
  question = { query: '', author: '', votes: 0, answer: 0 };

  constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>, public usersService: UsersService) {
    this.usersService.getCurrentUser().subscribe(username => {
      this.name = username;
      this.currentAuthor = this.name[0].username.toString();

      this.question = { query: '', author: this.currentAuthor, votes: 0, answer: 0 };

    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addQuestion() {
    this.newQuestion.unshift(this.question);
  }
}
