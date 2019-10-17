import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppConstants } from './shared/app-constants';
import { IQ } from './interfaces/iq';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  questionsArray: IQ[];
  currentIQNo = -1;
  private currentIQ = new Subject<IQ>();
  private allIQArray = new Subject<IQ[]>();

  constructor() {}

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
    switch (topic) {
      case AppConstants.ANGULAR:
        this.questionsArray = [
          {
            question: 'First Angular Question',
            answer: 'First Angular Answer'
          },
          {
            question: 'Second Angular Question',
            answer: 'Second Angular Answer'
          }
        ];
        break;
      case AppConstants.REACT:
        this.questionsArray = [
          {
            question: 'First React Question',
            answer: 'First React Answer'
          },
          {
            question: 'Second React Question',
            answer: 'Second Answer'
          }
        ];
        break;
      default:
        break;
    }
    this.currentIQNo = 0;
    this.allIQArray.next(this.questionsArray);
    this.currentIQ.next(this.questionsArray[this.currentIQNo]);
  }
}
