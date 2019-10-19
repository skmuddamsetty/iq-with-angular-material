import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from '../shared/app-constants';
import { IQ } from '../interfaces/iq';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private _dataChange: Subject<IQ> = new Subject<IQ>();
  private _dbPromise;

  constructor() {}

  connectToIDB() {
    this._dbPromise = openDB('pwa-database', 1, {
      upgrade(db) {
        if (
          !db.objectStoreNames.contains(
            AppConstants.ANGULAR_INTERVIEW_QUESTIONS
          )
        ) {
          db.createObjectStore(AppConstants.ANGULAR_INTERVIEW_QUESTIONS, {
            autoIncrement: false
          });
        }
        if (!db.objectStoreNames.contains('Sync-Items')) {
          db.createObjectStore('Sync-Items', {
            keyPath: 'id',
            autoIncrement: true
          });
        }
      }
    });
    // this._dbPromise = idb.open('pwa-database', 1, UpgradeDB => {
    //   if (
    //     !UpgradeDB.objectStoreNames.contains(
    //       AppConstants.ANGULAR_INTERVIEW_QUESTIONS
    //     )
    //   ) {
    //     UpgradeDB.createObjectStore(AppConstants.ANGULAR_INTERVIEW_QUESTIONS, {
    //       keyPath: 'id',
    //       autoIncrement: true
    //     });
    //   }
    //   if (!UpgradeDB.objectStoreNames.contains('Sync-Items')) {
    //     UpgradeDB.createObjectStore('Sync-Items', {
    //       keyPath: 'id',
    //       autoIncrement: true
    //     });
    //   }
    // });
  }

  addItems(target: string, value: any) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).put(
        {
          questions: value
        },
        'myownkey1'
      );
      this.getAllData(AppConstants.ANGULAR_INTERVIEW_QUESTIONS).then(
        (items: IQ) => {
          this._dataChange.next(items);
        }
      );
      return tx.complete;
    });
  }

  deleteItems(target: string, value: IQ) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      store.delete(value);
      this.getAllData(target).then((items: IQ) => {
        this._dataChange.next(items);
      });
      return tx.complete;
    });
  }

  getAllData(target: string) {
    return this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.get('myownkey1');
    });
  }

  dataChanged(): Observable<IQ> {
    return this._dataChange;
  }
}
