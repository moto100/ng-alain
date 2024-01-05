import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UUID } from 'angular2-uuid';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';

import { MqttDeviceComponent } from './mqttdevice.component';
import { SimulaterComponent } from './simulater.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceListComponent {
  loading = true;
  list: any[] = [];
  projectId = '';
  project: any = null;
  constructor(
    public activatedRouter: ActivatedRoute,
    private http: _HttpClient,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.activatedRouter.queryParams.subscribe(value => {
      this.projectId = value['projectId'];
    });
    this.http.post('controlpanel/www', { function: 'GetProject', projectId: this.projectId }).subscribe(res => {
      if (res.Status == 200) {
        if (res.Data != null) {
          this.project = res.Data;
          if (this.project.Devices == null) {
            this.project.Devices = [];
          }
        } else {
          this.project = {};
          this.project.Devices = [];
        }

        if (this.project != null && this.project.Devices != null) {
          this.list = this.project.Devices;
        }
      } else if (res.Status != 200) {
        this.modalSrv.error({
          nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
        });
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  EditDevice(device: any): void {
    if (device.DeviceType == 99) {
      //simulater
      this.editDeviceInternal(SimulaterComponent, device, '编辑模拟器虚拟设备');
    } else if (device.DeviceType == 3) {
      // mqtt
      this.editDeviceInternal(MqttDeviceComponent, device, '编辑MQTT虚拟设备');
    }
  }

  editDeviceInternal(compoment: any, device: any, title: string): void {
    let modal = this.modalSrv.create({
      nzTitle: title,
      nzContent: compoment,
      nzFooter: null,
      nzWidth: 1000,
      nzStyle: { top: '10px' },
      nzData: {
        Device: device
      }
    });

    modal.afterClose.subscribe(result => {
      if (result != null && result.Id != '') {
        let index = this.list.findIndex(value => value?.Id == result.Id);
        if (index >= 0) {
          this.loading = true;
          this.list.splice(index, 1);
          this.list = this.list.concat([result]);
          this.SaveDevices();
        }
        // let device = this.list.find(value => value?.Id == result.Id );
        // if(device != null)
        // {
        //   device = result;
        //   this.list = this.list.concat([]);
        // }
        // else{
        //   this.list = this.list.concat([result]);
        // }

        //this.cdr.detectChanges();
      }
    });
  }

  SaveDevices(): void {
    if (this.project != null) {
      this.loading = true;
      this.project.Devices = [];
      this.project.Devices = this.list;
      this.http.post('controlpanel/www', { function: 'UpdateProject', projectId: this.projectId, data: this.project }).subscribe(res => {
        if (res.Status != 200) {
          this.modalSrv.error({
            nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
          });
        }
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  AddMQTTDevice(): void {
    let id = UUID.UUID();
    let device = {
      Id: id,
      DeviceType: 3,
      Name: `MQTT-${id}`,
      Enable: true,
      InputDataProcessMode: 2,
      Options: { Mode: 'Server', Server: '127.0.0.1', Port: 1883, User: 'test', Password: 'test', Quality: 0, Retained: false },
      SubscriptionTopics: [{ Topic: 'zlanpublish' }],
      SubscriptionResultParser: '',
      PublishmentTopics: [{ Topic: 'zlanpublish1', Fields: 'Shidu' }],
      OnPublishmentParser: ''
    };
    this.list = this.list.concat([device]);
    this.SaveDevices();
    this.cdr.detectChanges();
  }

  AddSimulator(): void {
    let id = UUID.UUID();
    let device = {
      Id: id,
      DeviceType: 99,
      Name: `Simulator-${id}`,
      Enable: true,
      InputDataProcessMode: 1,
      Options: {
        GenerateBoolData: true,
        GenerateIntData: true,
        GenerateStringData: true,
        DataInstanceNumber: 7,
        TimerInterval: 1000,
        MinInteger: 0,
        MaxInteger: 120,
        IntegerStep: 1
      },
      ResultParser: ''
    };
    this.list = this.list.concat([device]);
    this.SaveDevices();
    this.cdr.detectChanges();
  }

  DeleteDevice(item: any): void {
    let modal = this.modalSrv.confirm({
      nzTitle: '<i>确定要删除设备？</i>',
      nzContent: item.Name,
      nzOnOk: () => {
        let index = this.list.findIndex(value => value?.Id == item.Id);
        if (index >= 0) {
          this.loading = true;
          let arr = this.list;
          arr.splice(index, 1);
          this.list = arr;
          this.SaveDevices();
          this.cdr.detectChanges();
          this.loading = false;
        }
      }
    });
  }
}
