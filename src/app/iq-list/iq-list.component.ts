import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iq-list',
  templateUrl: './iq-list.component.html',
  styleUrls: ['./iq-list.component.scss']
})
export class IQListComponent implements OnInit {
  iqArray = [
    {
      question: 'This is First Question',
      answer: 'This is First Answer'
    },
    {
      question: 'This is Second Question',
      answer: 'This is Second Answer'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
