import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IQ } from '../interfaces/iq';
import { AppConstants } from '../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items: AngularFirestoreCollection<IQ>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection<IQ>(AppConstants.ANGULAR_INTERVIEW_QUESTIONS);
  }

  addItem(item: any) {
    this.items.add(item);
  }

  getData() {
    return this.items;
  }
}
