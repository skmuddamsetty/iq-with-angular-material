import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { AppConstants } from './shared/app-constants';
import { IQ } from './interfaces/iq';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  questionsArray: IQ[];
  currentIQNo = -1;
  private currentIQ = new Subject<IQ>();
  private allIQArray = new Subject<IQ[]>();
  items: Observable<any[]>;

  constructor(public db: AngularFirestore) {}

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

  loadQuestionsFromDB(topic: string) {
    let itemDoc: AngularFirestoreDocument<IQ[]>;
    let subscription: Subscription;
    itemDoc = this.db.doc<IQ[]>('interview-questions/' + topic);
    this.items = itemDoc.valueChanges();
    subscription = this.items.subscribe((res: IQ[]) => {
      const resObj = res as any;
      this.questionsArray = resObj.iqs;
      this.currentIQNo = 0;
      this.allIQArray.next(this.questionsArray);
      this.currentIQ.next(this.questionsArray[this.currentIQNo]);
      subscription.unsubscribe();
    });
  }
}
