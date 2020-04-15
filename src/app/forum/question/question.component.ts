import { QUERY } from '../../models/data-base';
import { Router, NavigationExtras } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { Question } from 'src/app/models/question';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  title = 'Questions about Angular';
  newQuery: string;
  questions: Question[] = QUERY;

  constructor(public authService: AuthService, private router: Router, public dialog: MatDialog) { }

  goToAnswer(questions: Question, value: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: value + 1,
        author: questions.author,
      }
    };
    this.router.navigate(['/answer'], navigationExtras);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '450px',
      data: { query: '', author: '', votes: 0, answer: 0 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newQuery = result;
    });
  }

  addVoteQuestion(question: Question, value: number) {
    question.votes += value;
  }
}
