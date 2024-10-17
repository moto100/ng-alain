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
  inject,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

import { CodeMirrorComponent } from './codemirror.component';
interface IModalData {
  Device: any;
}

@Component({
  selector: 'app-simulater',
  templateUrl: './simulater.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulaterComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  @Input() Device: any;
  @ViewChild('cmResultParser')
  cmResultParser: CodeMirrorComponent = new CodeMirrorComponent();
  codeResultParser: string = '';
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
      InputDataProcessMode: [this.Device.InputDataProcessMode, []],
      GenerateBoolData: [this.Device.Options.GenerateBoolData, []],
      GenerateIntData: [this.Device.Options.GenerateIntData, []],
      GenerateStringData: [this.Device.Options.GenerateStringData, []],
      DataInstanceNumber: [this.Device.Options.DataInstanceNumber, [Validators.min(1)]],
      TimerInterval: [this.Device.Options.TimerInterval, [Validators.min(100)]],
      MinInteger: [this.Device.Options.MinInteger, []],
      MaxInteger: [this.Device.Options.MaxInteger, []],
      IntegerStep: [this.Device.Options.IntegerStep, [Validators.min(1)]],
      ResultParser: [this.Device.ResultParser, []]
    });
    this.codeResultParser = this.Device.ResultParser;
  }

  destroyModal(result: any): void {
    this.modal.destroy(result);
  }

  submit(): void {
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
          GenerateBoolData: this.form.value.GenerateBoolData,
          GenerateIntData: this.form.value.GenerateIntData,
          GenerateStringData: this.form.value.GenerateStringData,
          DataInstanceNumber: this.form.value.DataInstanceNumber,
          TimerInterval: this.form.value.TimerInterval,
          MinInteger: this.form.value.MinInteger,
          MaxInteger: this.form.value.MaxInteger,
          IntegerStep: this.form.value.IntegerStep
        },
        ResultParser: this.cmResultParser.getCode()
      });
      this.msg.success(`保存成功`);
      this.cdr.detectChanges();
    }, 1000);
  }

  cancel(): void {
    this.destroyModal(null);
  }
}
