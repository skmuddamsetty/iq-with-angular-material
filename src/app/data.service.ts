import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { AppConstants } from './shared/app-constants';
import { IQ } from './interfaces/iq';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { IdbService } from './services/idb.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  networkMode = 'online';
  questionsArray: IQ[];
  currentIQNo = -1;
  private currentIQ = new Subject<IQ>();
  private allIQArray = new Subject<IQ[]>();
  items: Observable<any[]>;

  constructor(public db: AngularFirestore, private idbService: IdbService) {
    navigator.onLine === true
      ? (this.networkMode = 'online')
      : (this.networkMode = 'offline');
  }

  // setCurrentIQNo(IQ: IQ) {
  //   this.currentIQ.next(IQ);
  // }

  // clearCurrentIQNo() {
  //   this.currentIQ.next();
  // }

  // getCurrentIQNo(): Observable<IQ> {
  //   return this.currentIQ.asObservable();
  // }

  setNextIQ() {
    if (this.currentIQNo === this.questionsArray.length) {
      this.currentIQ.next(this.questionsArray[0]);
    } else {
      this.currentIQNo++;
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
    }
  }

  setPrevIQ() {
    if (this.currentIQNo >= 1) {
      this.currentIQNo--;
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
    } else {
      this.currentIQ.next(this.questionsArray[0]);
    }
  }

  getNextIQ(): Observable<IQ> {
    if (this.currentIQNo === this.questionsArray.length) {
      this.currentIQ.next(this.questionsArray[0]);
    } else {
      this.currentIQNo++;
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
    }
    return this.currentIQ.asObservable();
  }

  getPrevIQ(): Observable<IQ> {
    if (this.currentIQNo >= 1) {
      this.currentIQNo--;
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
    } else {
      this.currentIQ.next(this.questionsArray[0]);
    }
    return this.currentIQ.asObservable();
  }

  getCurrentIQ(): Observable<IQ> {
    if (this.currentIQNo >= 0) {
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
    }
    return this.currentIQ.asObservable();
  }

  getAllIQArray() {
    return this.allIQArray.asObservable();
  }

  loadQuestionsFromDB(key: string) {
    let onlineDataLength;
    this.idbService
      .getAllDataForKeyInTarget(AppConstants.ANGULAR_INTERVIEW_QUESTIONS, key)
      .then((items: any) => {
        onlineDataLength = items ? items.length : 0;
        if (this.networkMode === 'online' && onlineDataLength === 0) {
          let itemDoc: AngularFirestoreDocument<IQ[]>;
          let subscription: Subscription;
          itemDoc = this.db.doc<IQ[]>('interview-questions/' + key);
          this.items = itemDoc.valueChanges();
          subscription = this.items.subscribe((res: IQ[]) => {
            const resObj = res as any;
            this.questionsArray = resObj.iqs;
            this.idbService.addItem(
              AppConstants.ANGULAR_INTERVIEW_QUESTIONS,
              this.questionsArray,
              key
            );
            this.currentIQNo = 0;
            this.allIQArray.next(this.questionsArray);
            this.currentIQ.next(this.questionsArray[this.currentIQNo]);
            subscription.unsubscribe();
          });
        } else {
          this.questionsArray = items;
          console.log('offline questions', this.questionsArray);
          this.currentIQNo = 0;
          this.allIQArray.next(this.questionsArray);
          this.currentIQ.next(this.questionsArray[this.currentIQNo]);
        }
      });
  }
}
