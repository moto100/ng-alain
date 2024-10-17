import { ChangeDetectionStrategy, Inject, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
interface IModalData {
  projectInfo: any;
  list: any;
}

@Component({
  selector: 'app-chart-config',
  templateUrl: './chart-config.component.html'
})
export class ChartConfigComponent implements OnInit {
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
  //readonly #modal = inject(NzModalRef);
  //readonly nzModalData: IModalData = Inject(NZ_MODAL_DATA);
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,

    private drawerRef: NzDrawerRef<IModalData>,
    @Inject(NZ_DRAWER_DATA) public nzData: IModalData
  ) {}
  ngOnInit(): void {
    console.log(this.nzData);
    this.projectInfo = this.nzData.projectInfo;
    this.list = this.nzData.list;
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
    //this.modal.destroy(result);
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
      this.drawerRef.close({
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
    }, 1000);
  }

  cancel(): void {
    this.destroyModal(null);
  }
}
