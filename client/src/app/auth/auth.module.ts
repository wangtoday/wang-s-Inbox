import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./components/auth/auth.component";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { SignupComponent } from "./containers/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./store/auth.reducer";

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "register",
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(appRoutes),

    // store module
    // StoreModule.forFeature("auth", authReducer)
    StoreModule.forFeature("auth", authReducer)
  ],
  declarations: [AuthComponent, LoginComponent, SignupComponent]
})
export class AuthModule {}
