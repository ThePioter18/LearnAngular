import { query } from '@angular/animations';
import { QUERY } from './../../models/data-base';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { Question } from 'src/app/models/question';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = 'Questions about Angular';
  newQuery: string;
  user: User;

  questions: Question[] = QUERY;

  constructor(public authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  goToAnswer() {
    this.router.navigate(['/answer']);
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

  addVote(questions: Question, value: number) {
    questions.votes += value;
  }
}
