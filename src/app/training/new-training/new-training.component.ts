import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  inputStr = `<div class="terminal">
  <pre>ng generate component xyz</pre>
  <pre>ng add @angular/material</pre>
  <pre>ng add _____</pre>
  <pre>ng test</pre>
  <pre>ng build --prod</pre>
</div>`;
  constructor() {}

  ngOnInit() {}
}
