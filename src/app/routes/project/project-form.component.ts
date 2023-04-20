import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  @Input() projectInfo: any;
  @Input() list: Array<{
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
  constructor(private fb: FormBuilder, private msg: NzMessageService, private modal: NzModalRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Name: [this.projectInfo.Name, [Validators.required]],
      ApiAddress: [this.projectInfo.ApiAddress, [Validators.required]],
      Desc: [this.projectInfo.Desc, []],
      LogLevel: [this.projectInfo.LogLevel == null ? 'Warning' : this.projectInfo.LogLevel, []]
      // EnableInfluxDB: [this.projectInfo.EnableInfluxDB, []],
      // InfluxDBAddress:[this.projectInfo.InfluxDBAddress, []],
      // InfluxDBOrganizationId:[this.projectInfo.InfluxDBOrganizationId, []],
      // InfluxDBBucketName:[this.projectInfo.InfluxDBBucketName, []],
      // InfluxDBMeasurement: [this.projectInfo.InfluxDBMeasurement, []],
      // InfluxDBAccessToken: [this.projectInfo.InfluxDBAccessToken, []],
    });
  }

  SiteCode(): string {
    return this.projectInfo.Id;
  }
  destroyModal(result: any): void {
    this.modal.destroy(result);
  }

  submit(): void {
    this.submitting = true;
    let url = this.form.value.ApiAddress;
    if (url != null) {
      url = url.trim();
      url = url.replace(/[\\/]+$/g, '');
      if (!url.toLowerCase().startsWith('http://')) {
        url = `http://${url}`;
      }
    }
    if (this.list.find(x => x.ApiAddress.toLocaleLowerCase() == url.toLocaleLowerCase())) {
      this.msg.error(`api地址不能重复`);
      this.submitting = false;
      return;
    }
    setTimeout(() => {
      this.submitting = false;
      this.destroyModal({
        Id: this.projectInfo.Id,
        Name: this.form.value.Name,
        Desc: this.form.value.Desc,
        LogLevel: this.form.value.LogLevel,
        ApiAddress: url,
        // EnableInfluxDB: this.form.value.EnableInfluxDB,
        // InfluxDBAddress: this.form.value.InfluxDBAddress,
        // InfluxDBOrganizationId: this.form.value.InfluxDBOrganizationId,
        // InfluxDBBucketName: this.form.value.InfluxDBBucketName,
        // InfluxDBMeasurement: this.form.value.InfluxDBMeasurement,
        // InfluxDBAccessToken: this.form.value.InfluxDBAccessToken,
        Deployed: this.projectInfo.Deployed == null ? false : this.projectInfo.Deployed
      });
      this.msg.success(`保存成功`);
      this.cdr.detectChanges();
    }, 1000);
  }

  cancel(): void {
    this.destroyModal(null);
  }
}
