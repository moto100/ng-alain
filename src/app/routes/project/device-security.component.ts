import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UUID } from 'angular2-uuid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-device-security',
  templateUrl: './device-security.component.html',
  styleUrls: ['./device-security.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceSecurityComponent implements OnInit {
  loading = true;
  list: any[] = [];
  projectId = '';
  project: any = null;
  form!: FormGroup;
  submitting = false;
  constructor(
    public fb: FormBuilder,
    private msg: NzMessageService,
    public activatedRouter: ActivatedRoute,
    private http: _HttpClient,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.activatedRouter.queryParams.subscribe(value => {
      this.projectId = value?.['projectId'];
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      EnableMode: [1, []],
      Devices: [[], []]
    });

    this.http.post('controlpanel/www', { function: 'GetProject', projectId: this.projectId }).subscribe(res => {
      if (res.Status == 200) {
        if (res.Data != null) {
          this.project = res.Data;
          if (this.project.DeviceSecurity == null) {
            this.project.DeviceSecurity = {
              EnableMode: 1,
              Devices: []
            };
          }
        } else {
          this.project = {
            DeviceSecurity: {
              EnableMode: 1,
              Devices: []
            }
          };
        }

        if (this.project != null && this.project.DeviceSecurity != null) {
          this.list = this.project.DeviceSecurity.Devices;
        }
        this.form = this.fb.group({
          EnableMode: [this.project.DeviceSecurity.EnableMode, []],
          Devices: [this.list, []]
        });
      } else if (res.Status != 200) {
        this.modalSrv.error({
          nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
        });
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    if (this.form.value.EnableMode == 2) {
      // white list
      let items = this.list.filter(item => item.Enabled && (item.DeviceId != '' || (item.UserName != '' && item.Password != '')));
      if (items.length == 0) {
        this.msg.warning(`白名单模式下，至少要有一个开启状态的规则是有设备Id或者一组有效的用户名和密码，密码不能空。`);
        return;
      }
    } else if (this.form.value.EnableMode == 3) {
      // black list
      let items = this.list.filter(item => item.Enabled && item.DeviceId != '');
      if (items.length == 0) {
        this.msg.warning(`黑名单模式下，至少要有一个开启状态的规则是有设备Id的。`);
        return;
      }
    }
    this.list.filter(item => item.DeviceId != '' || item.UserName != '');
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.SaveDevices();
      this.cdr.detectChanges();
    }, 1000);
  }

  SaveDevices(): void {
    if (this.project != null) {
      this.loading = true;
      this.project.DeviceSecurity.EnableMode = this.form.value.EnableMode;
      this.project.DeviceSecurity.Devices = this.list.filter(item => item.DeviceId != '' || item.UserName != '');
      this.http.post('controlpanel/www', { function: 'UpdateProject', projectId: this.projectId, data: this.project }).subscribe(res => {
        if (res.Status != 200) {
          this.modalSrv.error({
            nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
          });
        }
        this.msg.success(`保存成功`);
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  deleteRule(topic: any): void {
    let index = this.list.findIndex(value => value?.Id == topic.Id);
    if (index >= 0) {
      let arr = this.list;
      arr.splice(index, 1);
      this.list = arr;
    }
  }

  addRule(): void {
    let id = UUID.UUID();
    this.list.push({ Id: id, Enabled: true, DeviceId: '', UserName: '', Password: '' });
  }
}
