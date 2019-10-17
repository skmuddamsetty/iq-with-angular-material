import { Component, OnInit } from '@angular/core';
import { Tile } from '../interfaces/tile';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  breakpoint: number;

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' }
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 3;
  }

  onItemClick(event: Event, key: string) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/iq', key]);
  }
}
