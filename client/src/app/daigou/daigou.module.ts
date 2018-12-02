import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DaigouComponent } from './components/daigou/daigou.component';

const daigouRoute: Routes = [
  {
    path: '',
    component: DaigouComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(daigouRoute)],
  declarations: [DaigouComponent]
})
export class DaigouModule {}
