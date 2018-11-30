import { Component, OnInit, AfterContentChecked } from "@angular/core";
import "firebase/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth/store/auth.state";

declare const firebase: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = "client";

  logStatus: boolean = false;

  cc = false;

  loginForm: FormGroup;

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.getCurrentUser().then(value => {
      console.log(value);
      if (value) {
        this.logStatus = true;
      }
    });

    // this.store.select("auth").subscribe(value => {
    //   console.log(value);
    // });
  }

  ngAfterContentChecked(): void {
    // firebase.auth().signOut();
  }

  /**
   * Promise based auth check
   */
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(value => {
        // 如果登录成功, 这里可以跳转到主页面
        console.log(value);
        this.logStatus = true;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
}
