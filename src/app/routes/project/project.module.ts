import { NgModule } from '@angular/core';
// import { CountDownModule } from '@delon/abc/count-down';
// import { OnboardingModule } from '@delon/abc/onboarding';
// import { QuickMenuModule } from '@delon/abc/quick-menu';
// import { G2BarModule } from '@delon/chart/bar';
// import { G2CardModule } from '@delon/chart/card';
// import { G2GaugeModule } from '@delon/chart/gauge';
// import { G2MiniAreaModule } from '@delon/chart/mini-area';
// import { G2MiniBarModule } from '@delon/chart/mini-bar';
// import { G2MiniProgressModule } from '@delon/chart/mini-progress';
// import { NumberInfoModule } from '@delon/chart/number-info';
// import { G2PieModule } from '@delon/chart/pie';
// import { G2RadarModule } from '@delon/chart/radar';
// import { G2SingleBarModule } from '@delon/chart/single-bar';
// import { G2TagCloudModule } from '@delon/chart/tag-cloud';
// import { G2TimelineModule } from '@delon/chart/timeline';
// import { TrendModule } from '@delon/chart/trend';
// import { G2WaterWaveModule } from '@delon/chart/water-wave';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { SharedModule } from '@shared';
//import { CountdownModule } from 'ngx-countdown';

import { DataStorageComponent } from './data-storage.component';
import { DeviceListComponent } from './device-list.component';
import { DeviceSecurityComponent } from './device-security.component';
import { ModelTreeComponent } from './model-tree.component';
import { MqttDeviceComponent } from './mqttdevice.component';
import { NodeFormComponent } from './node-form.component';
import { ProjectDesignComponent } from './project-design.component';
import { ProjectFormComponent } from './project-form.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectLogComponent } from './project-log.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SimulaterComponent } from './simulater.component';
//import { NzPaginationModule } from 'ng-zorro-antd/pagination';
const COMPONENTS = [
  ProjectDesignComponent,
  DeviceListComponent,
  ModelTreeComponent,
  ProjectListComponent,
  ProjectFormComponent,
  NodeFormComponent,
  SimulaterComponent,
  MqttDeviceComponent,
  DeviceSecurityComponent,
  DataStorageComponent,
  ProjectLogComponent
];

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    // CountDownModule,
    // CountdownModule,
    // G2BarModule,
    // G2CardModule,
    // G2GaugeModule,
    // G2MiniAreaModule,
    // G2MiniBarModule,
    // G2MiniProgressModule,
    // G2PieModule,
    // G2RadarModule,
    // G2SingleBarModule,
    // G2TagCloudModule,
    // G2TimelineModule,
    // G2WaterWaveModule,
    // NumberInfoModule,
    // TrendModule,
    // QuickMenuModule,
    // OnboardingModule,
    // NzPaginationModule,
    EllipsisModule
  ],
  declarations: [...COMPONENTS]
})
export class ProjectModule {}
