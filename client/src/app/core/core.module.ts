import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers/containers.component';
import { Routes, RouterModule } from '@angular/router';
import { DaigouComponent } from './components/daigou/daigou.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

const coreRoutes: Routes = [
  {
    path: '',
    component: ContainersComponent,
    children: [
      {
        path: '',
        component: DaigouComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(coreRoutes), SharedModule],
  declarations: [ContainersComponent, DaigouComponent, HeaderComponent]
})
export class CoreModule {}
