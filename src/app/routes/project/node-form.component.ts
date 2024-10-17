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
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CodeMirrorComponent } from './codemirror.component';
@Component({
  selector: 'app-node-form',
  templateUrl: './node-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeFormComponent implements OnChanges {
  form!: FormGroup;
  submitting = false;
  @Input() modelNode: any;
  @Output() readonly modelNodeChange = new EventEmitter<object>();

  @ViewChild('cmExpression')
  cmExpression: CodeMirrorComponent = new CodeMirrorComponent();

  @ViewChild('cmAction')
  cmAction: CodeMirrorComponent = new CodeMirrorComponent();

  codeAction: string = '';
  codeExpression: string = '';
  predefinedJSObject =
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
    'var DevicesProxy = {' +
    'GetData : function(deviceName, fieldName){' +
    " return '';" +
    '}' +
    '}';
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.fb.group({
      Name: [changes?.['modelNode'].currentValue.Name, [Validators.required]],
      DefaultValue: [changes?.['modelNode'].currentValue.DefaultValue, [Validators.required]],
      ValueType: [changes?.['modelNode'].currentValue.ValueType, [Validators.required]],
      IsHiden: [changes?.['modelNode'].currentValue.IsHiden, [Validators.required]],
      IsStored: [
        changes?.['modelNode'].currentValue.IsStored == null ? false : changes?.['modelNode'].currentValue.IsStored,
        [Validators.required]
      ],
      Expression: [changes?.['modelNode'].currentValue.Expression, []],
      Action: [changes?.['modelNode'].currentValue.Action, []],
      InboundDevice: [changes?.['modelNode'].currentValue.InboundDevice, []],
      InboundField: [changes?.['modelNode'].currentValue.InboundField, []],
      OutboundDevice: [changes?.['modelNode'].currentValue.OutboundDevice, []],
      OutboundField: [changes?.['modelNode'].currentValue.OutboundField, []]
    });
    //this.cmExpression.setCode(changes?.['modelNode'].currentValue.Expression);
    //this.cmAction.setCode(changes?.['modelNode'].currentValue.cmAction);
    this.codeAction = changes?.['modelNode'].currentValue.Action;
    this.codeExpression = changes?.['modelNode'].currentValue.Expression;
  }

  submit(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      let updatedModelNode = {
        Name: this.form.value.Name,
        DefaultValue: this.form.value.DefaultValue,
        ValueType: this.form.value.ValueType,
        IsHiden: this.form.value.IsHiden,
        IsStored: this.form.value.ValueType == 2 || this.form.value.ValueType == 4 ? false : this.form.value.IsStored,
        Expression: this.cmExpression.getCode(),
        Action: this.cmAction.getCode(),
        InboundDevice: this.form.value.InboundDevice,
        InboundField: this.form.value.InboundField,
        OutboundDevice: this.form.value.OutboundDevice,
        OutboundField: this.form.value.OutboundField
      };
      this.modelNodeChange.emit(updatedModelNode);
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
  }
}
