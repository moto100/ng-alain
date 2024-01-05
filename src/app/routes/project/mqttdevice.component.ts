import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
interface IModalData {
  Device: any;
}
@Component({
  selector: 'app-mqttdevice',
  templateUrl: './mqttdevice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MqttDeviceComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  subscriptionTopics: any[] = [];
  publishmentTopics: any[] = [];
  @Input() Device: any;
  predefinedJSObject =
    'var DataSource = {' +
    "  DataSet : ''," +
    '};' +
    'var Console = {' +
    'log : function(message){' +
    ' ' +
    '},' +
    '};' +
    'var JSON = {' +
    'parse : function(content){' +
    " return ''; " +
    '},' +
    '};' +
    'var Device = {' +
    'SetField : function(fieldName, fieldValue){' +
    ' ' +
    '},' +
    ' SetWrittenField : function(fieldName, fieldValue){' +
    ' ' +
    '},' +
    'GetFieldValue : function(fieldName){' +
    " return '';" +
    '}' +
    '}';
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private modal: NzModalRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.Device = this.nzModalData.Device;
    this.form = this.fb.group({
      Name: [this.Device.Name, [Validators.required]],
      Enable: [this.Device.Enable, []],
      InputDataProcessMode: [this.Device.InputDataProcessMode ?? 2, []],
      Mode: [this.Device.Options.Mode, []],
      Server: [this.Device.Options.Server, [Validators.required]],
      Port: [this.Device.Options.Port, [Validators.required]],
      User: [this.Device.Options.User, [Validators.required]],
      Password: [this.Device.Options.Password, [Validators.required]],
      Quality: [this.Device.Options.Quality, []],
      Retained: [this.Device.Options.Retained, []],
      //SubscriptionTopics: [this.Device.SubscriptionTopics,  []],
      SubscriptionResultParser: [this.Device.SubscriptionResultParser, []],
      // PublishmentTopics: [this.Device.PublishmentTopics, []],
      OnPublishmentParser: [this.Device.OnPublishmentParser, []]
    });
    this.subscriptionTopics = this.Device.SubscriptionTopics;
    this.publishmentTopics = this.Device.PublishmentTopics == null ? [] : this.Device.PublishmentTopics;
  }

  deleteTopic(topic: any): void {
    let index = this.subscriptionTopics.findIndex(value => value?.Id == topic.Id);
    if (index >= 0) {
      let arr = this.subscriptionTopics;
      arr.splice(index, 1);
      this.subscriptionTopics = arr;
    }
  }

  addTopic(): void {
    let id = UUID.UUID();
    this.subscriptionTopics.push({ Id: id, Topic: '' });
  }

  deletePublishTopic(topic: any): void {
    let index = this.publishmentTopics.findIndex(value => value?.Id == topic.Id);
    if (index >= 0) {
      let arr = this.publishmentTopics;
      arr.splice(index, 1);
      this.publishmentTopics = arr;
    }
  }

  addPublishTopic(): void {
    let id = UUID.UUID();
    this.publishmentTopics.push({ Id: id, Topic: '', Fields: '' });
  }

  destroyModal(result: any): void {
    this.modal.destroy(result);
  }

  verifyjs(content: string): any {
    try {
      if (content != null && content != '') {
        eval(this.predefinedJSObject + content);
      }
    } catch (exception) {
      return exception;
    }
    return null;
  }

  submit(): void {
    let exception = this.verifyjs(this.form.value.SubscriptionResultParser);
    if (exception != null) {
      this.msg.warning(`接收到数据后触发的脚本有错误 : ${exception}`);
      return;
    }
    exception = this.verifyjs(this.form.value.OnPublishmentParser);
    if (exception != null) {
      this.msg.warning(`发送数据前触发的处理脚本有错误 : ${exception}`);
      return;
    }
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.destroyModal({
        Id: this.Device.Id,
        DeviceType: this.Device.DeviceType,
        Name: this.form.value.Name,
        Enable: this.form.value.Enable,
        InputDataProcessMode: this.form.value.InputDataProcessMode,
        Options: {
          Mode: this.form.value.Mode,
          Server: this.form.value.Server,
          Port: this.form.value.Port,
          User: this.form.value.User,
          Password: this.form.value.Password,
          Quality: this.form.value.Quality,
          Retained: this.form.value.Retained
        },
        SubscriptionTopics: this.subscriptionTopics.filter(item => item.Topic != ''),
        SubscriptionResultParser: this.form.value.SubscriptionResultParser,
        PublishmentTopics: this.publishmentTopics.filter(item => item.Topic != '' && item.Fields != ''),
        OnPublishmentParser: this.form.value.OnPublishmentParser
      });
      this.msg.success(`保存成功`);
      this.cdr.detectChanges();
    }, 1000);
  }

  cancel(): void {
    this.destroyModal(null);
  }
}
