import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";

const daigouRoute: Routes = [
  {
    path: "",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(daigouRoute)],
  declarations: [DashboardComponent]
})
export class MoneyModule {}
