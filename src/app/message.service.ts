import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  items: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore
    ) { }

  getContent(): Observable<any> {
    const ref = of([{testAlert: 'You have been warned!'}]);
    return ref;
  }

  getFirebaseContent(): Observable<any> {
    const ref = this.firestore.collection('alerts').valueChanges();
    return ref;
  }
}
