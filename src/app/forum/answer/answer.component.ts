import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  title = 'Answers about Angular';

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToQuestion() {
    this.router.navigate(['/question']);
  }
}
