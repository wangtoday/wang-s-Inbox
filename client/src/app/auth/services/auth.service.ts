import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { CoreHttpService } from 'src/app/service/core-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authService: CoreHttpService) {}

  resetPassword(email) {
    var actionCodeSettings = {
      url: 'www.google.com'
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

  login(loginObj) {
    const { email, password } = loginObj;
    return this.authService
      .fireAuth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        let { email, uid } = result.user;
        return {
          email,
          uid
        };
      });
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
