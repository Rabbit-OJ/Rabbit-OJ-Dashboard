import { Component, OnInit, Input } from '@angular/core';
import { QuestionDetail } from 'src/app/interface/question-detail';
import { ContestQuestion } from 'src/app/interface/contest-question';

import marked from "marked";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() question: QuestionDetail | ContestQuestion = {
    tid: 0,
    content: "<p></p>",
    subject: "",
    attempt: 0,
    accept: 0,
    difficulty: 0,
    time_limit: 0,
    space_limit: 0,
    created_at: "",
    sample: [],
    hide: false
  };
  @Input() isContest: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  renderQuestionContent = () => {
    const { content } = this.question;
    if (content) {
      return marked(content);
    } else {
      return "";
    }
  };

}
