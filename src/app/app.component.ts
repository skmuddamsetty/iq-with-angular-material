import { Component, OnInit } from '@angular/core';
import { IdbService } from './services/idb.service';
import { FirebaseService } from './services/firebase.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { IQ } from './interfaces/iq';
import { AppConstants } from './shared/app-constants';

import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  networkMode = 'online';
  items: Observable<IQ[]>;
  questionsArray = [];
  constructor(
    private idbService: IdbService,
    private firebase: FirebaseService,
    private db: AngularFirestore
  ) {
    navigator.onLine === true
      ? (this.networkMode = 'online')
      : (this.networkMode = 'offline');

    this.idbService.connectToIDB();
    let onlineDataLength;

    this.idbService
      .getAllData(AppConstants.ANGULAR_INTERVIEW_QUESTIONS)
      .then((items: any) => {
        console.log(items);
        onlineDataLength = items ? items.length : 0;
        if (this.networkMode === 'online' && onlineDataLength === 0) {
          // this.items = this.db
          //   .collection<IQ>(AppConstants.ANGULAR_INTERVIEW_QUESTIONS)
          //   .snapshotChanges()
          //   .pipe(
          //     map((actions: any) => {
          //       return actions.map(a => {
          //         const data = a.payload.doc.data() as any;
          //         this.idbService.addItems(
          //           AppConstants.ANGULAR_INTERVIEW_QUESTIONS,
          //           data
          //         );
          //         return { ...data };
          //       });
          //     })
          //   );
          let itemDoc: AngularFirestoreDocument<IQ[]>;
          itemDoc = this.db.doc<IQ[]>(
            'interview-questions/' + 'VVDkNu9BJd8WwdASz1CR'
          );
          this.items = itemDoc.valueChanges();
          this.items.subscribe((res: IQ[]) => {
            const resObj = res as any;
            this.questionsArray = resObj.iqs;
            console.log(this.questionsArray);
            this.idbService.addItems(
              AppConstants.ANGULAR_INTERVIEW_QUESTIONS,
              this.questionsArray
            );
          });
        } else {
          this.items = of(items);
        }

        this.idbService.dataChanged().subscribe((data: any) => {
          this.items = of(data);
          console.log(this.items);
          this.items.subscribe((res: IQ[]) => {
            const resObj = res as any;
            this.questionsArray = resObj.iqs;
            console.log(this.questionsArray);
          });
        });
      });
  }

  ngOnInit() {}
}
