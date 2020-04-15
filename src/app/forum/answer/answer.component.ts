import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { MatDialog } from '@angular/material';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { REPLY } from 'src/app/models/data-answer';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {

  title = 'Answers about Angular';
  newAnswer: string;

  id: number;

  answers: Answer[] = REPLY;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public authService: AuthService) {

    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
  }

  goToQuestion() {
    this.router.navigate(['/question']);
  }
  openDialogAnswer() {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: '450px',
      data: { reply: '', authorQuestion: '', author: '', votes: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newAnswer = result;
    });

  }

  goToLogin() {

    this.router.navigate(['/login']);
  }

  addVoteAnswer(answers: Answer, value: number) {
    answers.votes += value;
  }


}
