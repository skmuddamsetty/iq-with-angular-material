import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { IQ } from '../interfaces/iq';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from '../shared/app-constants';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-iq-list',
  templateUrl: './iq-list.component.html',
  styleUrls: ['./iq-list.component.scss']
})
export class IQListComponent implements OnInit, OnDestroy {
  items: Observable<any[]>;
  questions: [];
  currentIQ: IQ;
  selectedTopic: string;
  subscriptions: Subscription[] = [];
  iqArray = [];
  constructor(public dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getCurrentIQ().subscribe(res => {
        this.currentIQ = res;
      })
    );
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.dataService.loadQuestionsFromDB(params[AppConstants.TOPIC]);
      })
    );
    this.subscriptions.push(
      this.dataService.getAllIQArray().subscribe(allIQ => {
        this.iqArray = allIQ;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }
}
