import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainersComponent } from "./containers/containers.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { authReducer } from "../auth/store/auth.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "../auth/store/auth.effects";
import { daigouReducer } from "../daigou/store/daigou.reducer";

const coreRoutes: Routes = [
  {
    path: "",
    component: ContainersComponent,
    children: [
      {
        path: "",
        redirectTo: "daigou",
        pathMatch: "true"
      },
      {
        path: "daigou",
        loadChildren: "../daigou/daigou.module#DaigouModule"
      },
      {
        path: "money",
        loadChildren: "../money/money.module#MoneyModule"
      },
      {
        path: "setting",
        loadChildren: "../setting/setting.module#SettingModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    // StoreModule.forFeature('daigou', daigouReducer),
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule
  ],
  declarations: [ContainersComponent, HeaderComponent]
})
export class CoreModule {}
