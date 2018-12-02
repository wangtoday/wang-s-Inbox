import { Injectable } from "@angular/core";

import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { CoreHttpService } from "src/app/service/core-http.service";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private authService: CoreHttpService) {}

  resetPassword(email) {
    var actionCodeSettings = {
      url: "www.google.com"
    };
    return this.authService
      .fireAuth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        return true;
      })
      .catch(function(error) {
        // An error happened.
        return false;
      });
  }

  loginStatus(): Observable<any> {
    return Observable.create(obser => {
      return this.authService.fireAuth().onAuthStateChanged(
        user => {
          if (user) {
            let { email, uid } = user;
            return obser.next({
              email,
              uid
            });
          }
          return obser.next(null);
        },
        error => obser.error(null),
        () => obser.complete()
      );
    });
  }

  /**
   * 把promise改成了observable的登陆
   * @param loginObj
   */
  login(loginObj): Observable<any> {
    const { email, password } = loginObj;
    const observable$ = from(
      this.authService.fireAuth().signInWithEmailAndPassword(email, password)
    );

    return observable$.pipe(
      map(result => {
        let { email, uid } = result.user;
        return {
          email,
          uid
        };
      })
    );
  }

  userdeatail(uid: string): Observable<any> {
    const db = this.authService.fireStore();
    // Create a reference to the cities collection
    var citiesRef = db.collection("user");

    // Create a query against the collection.
    var query$ = from(citiesRef.where("userid", "==", uid).get());

    return query$.pipe(
      map(value => {
        // console.log(value);
        // note： 这个地方应该是只有一个valu才对的
        let data;
        value.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          data = doc.data();
        });
        return data;
      })
    );
  }

  /**
   * Promise based auth check
   */
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.authService
        .fireAuth()
        .onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
        }, reject);
    });
  }
}
