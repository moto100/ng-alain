import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataStorageComponent } from './data-storage.component';
import { DeviceListComponent } from './device-list.component';
import { DeviceSecurityComponent } from './device-security.component';
import { ModelTreeComponent } from './model-tree.component';
import { ProjectDesignComponent } from './project-design.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectLogComponent } from './project-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'project-list', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'project-log', component: ProjectLogComponent },
  {
    path: 'project-design',
    component: ProjectDesignComponent,
    children: [
      { path: '', redirectTo: 'model-tree', pathMatch: 'full' },
      {
        path: 'model-tree',
        component: ModelTreeComponent,
        data: { titleI18n: 'app.project.model' }
      },
      {
        path: 'device-list',
        component: DeviceListComponent,
        data: { titleI18n: 'app.project.device' }
      },
      {
        path: 'device-security',
        component: DeviceSecurityComponent,
        data: { titleI18n: 'app.project.devicesecurity' }
      },
      {
        path: 'data-storage',
        component: DataStorageComponent,
        data: { titleI18n: 'app.project.datastorage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
