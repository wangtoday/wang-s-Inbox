import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

export const rootRoutes: Routes = [
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "", redirectTo: "/auth", pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule],
  providers: []
})
export class RootRouterModule {}
