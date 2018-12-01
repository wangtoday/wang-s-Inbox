import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FeatureSettingComponent } from './components/feature-setting/feature-setting.component';
import { UserinfoSettingComponent } from './components/userinfo-setting/userinfo-setting.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContainerComponent, FeatureSettingComponent, UserinfoSettingComponent]
})
export class SettingModule { }
