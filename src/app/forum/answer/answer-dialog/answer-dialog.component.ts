import { UsersService } from './../../../services/users.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Answer } from 'src/app/models/answer';
import { REPLY } from 'src/app/models/data-answer';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QUERY } from 'src/app/models/data-base';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.css']
})
export class AnswerDialogComponent {

  newAnswer: Answer[] = REPLY;
  questions: Question[] = QUERY;

  id: number;
  authorQuestionString: string;
  name: Array<{ username: string; }> = [];
  currentAuthor: string;
  countAnswer: number;

  answer = { idQuestion: this.id, reply: '', authorQuestion: '', authorAnswer: '', votes: 0 };

  constructor(public dialogRef: MatDialogRef<AnswerDialogComponent>, public usersService: UsersService, public route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    this.route.queryParamMap.subscribe(params => {
      this.authorQuestionString = params.get('author');
    });

    this.usersService.getCurrentUser().subscribe(username => {
      this.name = username;
      this.currentAuthor = this.name[0].username.toString();


      this.answer = {
        idQuestion: this.id, reply: '',
        authorQuestion: this.authorQuestionString,
        authorAnswer: this.currentAuthor,
        votes: 0
      };

    });
    // tslint:disable-next-line:triple-equals
    this.countAnswer = this.newAnswer.filter(x => x.idQuestion == this.id).length;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAnswer() {
    this.newAnswer.push(this.answer);

    this.questions.filter(q => {
      // tslint:disable-next-line:triple-equals
      if (q.idQuestion == this.id) {
        q.answer = this.countAnswer + 1;
      }
    });

  }

}
