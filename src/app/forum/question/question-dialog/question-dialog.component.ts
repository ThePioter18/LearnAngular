import { UsersService } from './../../../services/users.service';
import { QUERY } from '../../../models/data-base';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Question } from '../../../models/question';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  newQuestion: Question[] = QUERY;

  name: Array<{ username: string; }> = [];
  currentAuthor: string;
  id: number;
  question = { idQuestion: this.id, query: '', author: '', votes: 0, answer: 0 };

  constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>, public usersService: UsersService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.newQuestion.filter(f => f.idQuestion).length + 1;

    this.usersService.getCurrentUser().subscribe(username => {
      this.name = username;
      this.currentAuthor = this.name[0].username.toString();

      this.question = { idQuestion: this.id, query: '', author: this.currentAuthor, votes: 0, answer: 0 };

    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addQuestion() {
    this.newQuestion.push(this.question);
  }
}
