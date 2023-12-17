import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UUID } from 'angular2-uuid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';

import { ProjectFormComponent } from './project-form.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  list: Array<{
    Id: string;
    Name: string;
    ApiAddress: string;
    IsRunning: boolean;
    Deployed: boolean;
    Avatar: string;
    Desc: string;
    LogLevel: string;
    //  EnableInfluxDB: boolean;
    // InfluxDBAddress: string;
    // InfluxDBOrganizationId: string;
    // InfluxDBBucketName: string;
    // InfluxDBMeasurement: string;
    // InfluxDBAccessToken: string;
  }> = [];
  loading = true;
  runningApps: Array<{ Id: string; TimeoutId: NodeJS.Timeout | null }> = [];
  // deployedProjectId = "";
  // runningProjectId = "";
  // keepAliveUrl = "";
  readonly defaultProject = {
    Id: '',
    Name: '新建应用',
    Desc: '新建应用的描述',
    ApiAddress: 'http://localhost:9001',
    Deployed: false,
    LogLevel: 'Warning'
  };
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private modalSrv: NzModalService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.runningProjectId = "";
    // this.deployedProjectId = "";
    // this.keepAliveUrl =""

    if (this.runningApps != null && this.runningApps.length > 0) {
      this.runningApps.forEach(app => {
        //app.IsRunning = false;
        if (app.TimeoutId != null) {
          try {
            clearTimeout(app.TimeoutId);
            app.TimeoutId = null;
          } catch (error) {}
        }
      });
    }

    this.http.post('controlpanel/www', { function: 'GetProjectInfos' }).subscribe(res => {
      if (res.Status == 200 && res.Data != null) {
        //this.list = this.list.concat(res.Data);
        this.list = res.Data;
        this.list.forEach(project => {
          project.IsRunning = false;
        });
        let projects = this.list.filter(value => value?.Deployed);
        if (projects.length > 0) {
          projects.forEach(project => {
            if (project?.ApiAddress != null && project.ApiAddress.trim() != '') {
              project.IsRunning = false;
              let keepAliveUrl = `${project.ApiAddress}/service/KeepAlive`;
              this.keepAlive(project.Id, keepAliveUrl);
            }
          });
          // // this.deployedProjectId = project.Id;
          // // this.runningProjectId = "";
          // // if (project.ApiAddress != null && project.ApiAddress.trim() != "" )
          // // {
          // //   this.keepAliveUrl = project.ApiAddress + "/service/KeepAlive";
          // //   this.keepAlive();
          // // }
        }
        // else
        // {
        //   this.keepAliveUrl = "";
        //   this.runningProjectId = "";
        //   this.deployedProjectId = "";
        // }
      } else if (res.Status != 200) {
        this.modalSrv.info({
          nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
        });
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  // IsAppRunning(item: any): boolean
  // {
  //   let pro = this.runningApps.find(x =>{x.Id == item.Id})
  //   if (pro == null){
  //      return false;
  //   }
  //   else
  //   {
  //     return pro.IsRunning;
  //   }
  // }

  keepAlive(projectId: string, keepAliveUrl: string): void {
    if (projectId == null || projectId.trim() == '') {
      return;
    }
    if (keepAliveUrl == null || keepAliveUrl.trim() == '') {
      return;
    }

    this.http.get(keepAliveUrl).subscribe({
      next: res =>
        //if(this.deployedProjectId != null && this.deployedProjectId.trim() != "" ){
        {
          if (res.Status == 200 && res.Data != null && projectId == res.Data) {
            let project = this.list.find(value => value?.Id == projectId);
            if (project != null) {
              project.IsRunning = true;
            }
            let pro = this.runningApps.find(x => x.Id == projectId);
            if (pro == null) {
              this.runningApps.push({ Id: projectId, TimeoutId: null });
            }
          }
          this.cdr.detectChanges();
          let timeoutId = setTimeout(this.keepAlive.bind(this, projectId, keepAliveUrl), 2000);
          let pro = this.runningApps.find(x => x.Id == projectId);
          if (pro != null) {
            pro.TimeoutId = timeoutId;
          }
        },
      error: () => {
        let pro = this.runningApps.find(x => x.Id == projectId);
        if (pro == null) {
          this.runningApps.push({ Id: projectId, TimeoutId: null });
        }
        let project = this.list.find(value => value?.Id == projectId);
        if (project != null) {
          project.IsRunning = false;
          if (project.Deployed) {
            let timeoutId = setTimeout(this.keepAlive.bind(this, projectId, keepAliveUrl), 2000);
            pro = this.runningApps.find(x => x.Id == projectId);
            if (pro != null) {
              pro.TimeoutId = timeoutId;
            }
          }
        }
        this.cdr.detectChanges();
      }
      //}
    });
  }

  UpdateProjects(): void {
    this.loading = true;
    var listdata = this.list; //.slice(1);
    this.http.post('controlpanel/www', { function: 'UpdateProjectInfos', data: listdata }).subscribe(res => {
      if (res.Status != 200) {
        this.modalSrv.info({
          nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
        });
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  designProject(item: any): void {
    let project = item;
    this.router.navigate(['/project/project-design/model-tree'], { queryParams: { projectId: project.Id } });
  }

  addNewProject(): void {
    let newProject = JSON.parse(JSON.stringify(this.defaultProject));
    newProject.Id = UUID.UUID();
    this.editNewProjectInternal(newProject, '新建应用', this.list);
  }

  editProject(item: any): void {
    this.editNewProjectInternal(item, '编辑应用', this.list);
  }

  editNewProjectInternal(project: any, title: string, list: any): void {
    let modal = this.modalSrv.create({
      nzTitle: title,
      nzWidth: 800,
      nzStyle: { top: '10px' },
      nzContent: ProjectFormComponent,
      nzFooter: null,
      nzComponentParams: {
        projectInfo: project,
        list: list.filter((x: { Id: any }) => x?.Id != project.Id)
      }
    });

    modal.afterClose.subscribe(result => {
      if (result != null) {
        if (result.Id != null && result.Id != '') {
          let project = this.list.find(value => value?.Id == result.Id);
          if (project != null) {
            project.Name = result.Name;
            project.Desc = result.Desc;
            project.Avatar = '';
            project.LogLevel = result.LogLevel;
            project.ApiAddress = result.ApiAddress;
            project.Deployed = result.Deployed;
            //project.IsRunning = result.IsRunning;
            // project.EnableInfluxDB= result.EnableInfluxDB,
            // project.InfluxDBAddress= result.InfluxDBAddress,
            // project.InfluxDBOrganizationId= result.InfluxDBOrganizationId,
            // project.InfluxDBBucketName= result.InfluxDBBucketName,
            // project.InfluxDBMeasurement= result.InfluxDBMeasurement,
            // project.InfluxDBAccessToken= result.InfluxDBAccessToken,
            //project.Running = false;
            this.UpdateProjects();
            this.cdr.detectChanges();
          } else {
            this.list = this.list.concat([
              {
                Id: result.Id,
                Name: result.Name,
                Desc: result.Desc,
                Avatar: '',
                ApiAddress: result.ApiAddress,
                Deployed: false,
                IsRunning: false,
                LogLevel: result.LogLevel
                //     EnableInfluxDB: result.EnableInfluxDB,
                //     InfluxDBAddress: result.InfluxDBAddress,
                // InfluxDBOrganizationId: result.InfluxDBOrganizationId,
                // InfluxDBBucketName: result.InfluxDBBucketName,
                // InfluxDBMeasurement: result.InfluxDBMeasurement,
                // InfluxDBAccessToken: result.InfluxDBAccessToken,
                //Running : false
              }
            ]);
            this.UpdateProjects();
            this.cdr.detectChanges();
          }
        }
      }
    });
  }
  undeployProject(item: any): void {
    this.modalSrv.confirm({
      nzTitle: '<i>确定要卸载运行的该应用？</i>',
      nzContent: item.Name,
      nzOnOk: () => {
        let project = this.list.find(value => value?.Id == item.Id);
        if (project != null && project != undefined) {
          this.loading = true;

          //this.undeployedProject = project;
          this.http.post('controlpanel/www', { function: 'UndeployProject', projectId: item.Id }).subscribe(res => {
            if (res.Status != 200) {
              this.modalSrv.info({
                nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
              });
            }
            // let index = this.runningApps.findIndex(x =>{x.Id == project?.Id})
            // if(index >=  0)
            // {
            //   this.runningApps.splice(index, 1);
            // }

            //project?.IsRunning = false;

            this.ngOnInit();
            //this.deployedProjectId = "";
            //this.undeployedProject.Deployed = false;
            //this.undeployedProject.Running = false;
            this.loading = false;
            this.cdr.detectChanges();
          });
        }
      }
    });
  }

  deployProject(item: any): void {
    this.modalSrv.confirm({
      nzTitle: '<i>确定要发布/运行该应用？</i>',
      nzContent: item.Name,
      nzOnOk: () => {
        let project = this.list.find(value => value?.Id == item.Id);
        if (project != null) {
          //this.deployedProject =project;
          this.loading = true;
          this.http.post('controlpanel/www', { function: 'DeployProject', projectId: item.Id }).subscribe(res => {
            if (res.Status != 200) {
              if (res.Status == 19) {
                this.modalSrv.info({
                  nzTitle: '此应用没有任何的配置，请配置此应用。'
                });
              } else {
                this.modalSrv.info({
                  nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
                });
              }
            }
            //this.ngOnInit();
            //this.deployedProjectId = "";
            this.ngOnInit();
            // if (item.ApiAddress != null && item.ApiAddress.trim() != "" )
            // {
            //   this.deployedProjectId = item.Id;
            //   this.deployedProject.Deployed = true;
            //   this.keepAlive(item.ApiAddress + "/service/KeepAlive");
            // }
            this.loading = false;
            this.cdr.detectChanges();
          });
        }
      }
    });
  }

  handleFileStatusChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} 文件上次成功！`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 文件上次失败.`);
    }
  }

  exportProject(item: any): void {
    let project = this.list.find(value => value?.Id == item.Id);
    if (project != null) {
      this.loading = true;
      this.http
        .post('controlpanel/downloadfile', { function: 'DownloadProject', projectId: item.Id }, null, { responseType: 'blob' })
        .subscribe(res => {
          // if(res.Status == 200 && res.Data != null){
          //   this.SaveExcel(res.Data, item.Name);
          //   this.loading = false;
          // }
          this.loading = false;
          this.SaveFile(res, item.Name);
        });
    }
  }

  SaveFile(data: Blob, name: string) {
    let a = document.createElement('a');
    let blob = new Blob([data], { type: 'application/json' });
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.json`;
    a.click();
    a.remove();
  }

  deleteProject(item: any): void {
    // let index = parent.list.findIndex(value => value?.Id == item.Id );
    // if(index >=  0)
    // {
    //   parent.list.splice(index, 1);
    //   parent.UpdateProjects();
    //   parent.cdr.detectChanges();
    // }
    let modal = this.modalSrv.confirm({
      nzTitle: '<i>确定要删除该应用？</i>',
      nzContent: item.Name,
      nzOnOk: () => {
        let index = this.list.findIndex(value => value?.['Id'] == item.Id);
        if (index >= 0) {
          this.loading = true;
          let arr = this.list;
          arr.splice(index, 1);
          this.list = arr;
          this.UpdateProjects();
          this.cdr.detectChanges();
          this.loading = false;
        }
      }
    });

    // modal.afterClose.subscribe(result => {
    //   parent.cdr.detectChanges();
    //   // let index = parent.list.findIndex(value => value?.Id == item.Id );
    //   //   if(index >=  0)
    //   //   {
    //   //     parent.list.splice(index, 1);
    //   //     parent.cdr.detectChanges();
    //   //   }
    // });
  }

  startAllDepolyedProjects(): void {
    let pros = this.list.filter(x => x?.Deployed);
    if (pros.length == 0) {
      this.msg.info(`没有发布的应用可以运行！`);
      return;
    }

    let modal = this.modalSrv.confirm({
      nzTitle: '<i>确定要运行全部已发布的应用？</i>',
      nzOnOk: () => {
        //this.deployedProject =project;
        this.loading = true;
        this.http.post('controlpanel/www', { function: 'StartDeployedProjects' }).subscribe(res => {
          if (res.Status != 200) {
            this.modalSrv.info({
              nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
            });
          }
          //this.ngOnInit();
          //this.deployedProjectId = "";
          this.ngOnInit();
          // if (item.ApiAddress != null && item.ApiAddress.trim() != "" )
          // {
          //   this.deployedProjectId = item.Id;
          //   this.deployedProject.Deployed = true;
          //   this.keepAlive(item.ApiAddress + "/service/KeepAlive");
          // }
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  stopAllDepolyedProjects(): void {
    let pros = this.list.filter(x => x?.Deployed);
    if (pros.length == 0) {
      this.msg.info(`没有运行中的应用！`);
      return;
    }

    let modal = this.modalSrv.confirm({
      nzTitle: '<i>确定要停止全部运行中的应用？</i>',
      nzOnOk: () => {
        //this.deployedProject =project;
        this.loading = true;
        this.http.post('controlpanel/www', { function: 'StopDeployedProjects' }).subscribe(res => {
          if (res.Status != 200) {
            this.modalSrv.info({
              nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
            });
          }

          this.list.forEach(project => {
            project.IsRunning = false;
          });
          //this.ngOnInit();
          //this.deployedProjectId = "";
          if (this.runningApps != null && this.runningApps.length > 0) {
            this.runningApps.forEach(app => {
              //app.IsRunning = false;
              if (app.TimeoutId != null) {
                try {
                  clearTimeout(app.TimeoutId);
                  app.TimeoutId = null;
                } catch (error) {}
              }
            });
          }
          // if (item.ApiAddress != null && item.ApiAddress.trim() != "" )
          // {
          //   this.deployedProjectId = item.Id;
          //   this.deployedProject.Deployed = true;
          //   this.keepAlive(item.ApiAddress + "/service/KeepAlive");
          // }
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
}
