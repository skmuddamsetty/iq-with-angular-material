import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-iq',
  templateUrl: './iq.component.html',
  styleUrls: ['./iq.component.scss']
})
export class IqComponent implements OnInit {
  @Input() question: string;
  @Input() answer: string;

  constructor() {}

  ngOnInit() {}
}
