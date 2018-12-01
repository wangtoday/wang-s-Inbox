import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {
  firestore;
  constructor() {
    this.firestore = firebase.firestore();
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    this.firestore.settings(settings);
  }

  fireAuth() {
    return firebase.auth();
  }

  fireStore() {
    return this.fireStore;
  }

  addDate(addObj) {
    return this.firestore.collection('income').add(addObj);
  }

  list() {
    return this.firestore
      .collection('income')
      .get()
      .then(function(querySnapshot) {
        return querySnapshot;

        // .forEach(function(doc) {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());

        // });
      });
  }
}
