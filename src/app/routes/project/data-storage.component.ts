import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UUID } from 'angular2-uuid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-device-data-storage',
  templateUrl: './data-storage.component.html',
  styleUrls: ['./data-storage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataStorageComponent implements OnInit {
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
      this.projectId = value['projectId'];
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      EnableInfluxDB: false,
      InfluxDBAddress: '',
      InfluxDBOrganizationId: '',
      InfluxDBBucketName: '',
      InfluxDBMeasurement: '',
      InfluxDBAccessToken: ''
    });

    this.http.post('controlpanel/www', { function: 'GetProject', projectId: this.projectId }).subscribe(res => {
      if (res.Status == 200) {
        if (res.Data != null) {
          this.project = res.Data;
          if (this.project.DataStorage == null) {
            this.project.DataStorage = {
              EnableInfluxDB: false,
              InfluxDBAddress: '',
              InfluxDBOrganizationId: '',
              InfluxDBBucketName: '',
              InfluxDBMeasurement: '',
              InfluxDBAccessToken: ''
            };
          }
        } else {
          this.project = {
            DataStorage: {
              EnableInfluxDB: false,
              InfluxDBAddress: '',
              InfluxDBOrganizationId: '',
              InfluxDBBucketName: '',
              InfluxDBMeasurement: '',
              InfluxDBAccessToken: ''
            }
          };
        }
        this.form = this.fb.group({
          EnableInfluxDB: [this.project.DataStorage.EnableInfluxDB, []],
          InfluxDBAddress: [this.project.DataStorage.InfluxDBAddress, []],
          InfluxDBOrganizationId: [this.project.DataStorage.InfluxDBOrganizationId, []],
          InfluxDBBucketName: [this.project.DataStorage.InfluxDBBucketName, []],
          InfluxDBMeasurement: [this.project.DataStorage.InfluxDBMeasurement, []],
          InfluxDBAccessToken: [this.project.DataStorage.InfluxDBAccessToken, []]
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
    if (this.form.value.EnableInfluxDB) {
      if (
        this.form.value.InfluxDBAddress == '' ||
        this.form.value.InfluxDBOrganizationId == '' ||
        this.form.value.InfluxDBBucketName == '' ||
        this.form.value.InfluxDBMeasurement == '' ||
        this.form.value.InfluxDBAccessToken == ''
      ) {
        this.msg.warning(`InfluxDB信息不能空。`);
        return;
      }
    }

    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.SaveDataStorage();
      this.cdr.detectChanges();
    }, 1000);
  }

  SaveDataStorage(): void {
    if (this.project != null) {
      this.loading = true;
      this.project.DataStorage.EnableInfluxDB = this.form.value.EnableInfluxDB;
      this.project.DataStorage.InfluxDBAddress = this.form.value.InfluxDBAddress;
      this.project.DataStorage.InfluxDBOrganizationId = this.form.value.InfluxDBOrganizationId;
      this.project.DataStorage.InfluxDBBucketName = this.form.value.InfluxDBBucketName;
      this.project.DataStorage.InfluxDBMeasurement = this.form.value.InfluxDBMeasurement;
      this.project.DataStorage.InfluxDBAccessToken = this.form.value.InfluxDBAccessToken;

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
}
