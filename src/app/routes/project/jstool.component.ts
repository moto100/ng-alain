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
  ViewChild,
  ElementRef,
  inject
} from '@angular/core';

import { CodeMirrorComponent } from './codemirror.component';
@Component({
  selector: 'app-jstool',
  templateUrl: './jstool.component.html',
  styleUrls: ['./jstool.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsToolComponent implements OnInit {
  @ViewChild('cmJsTool')
  cmJsTool: CodeMirrorComponent = new CodeMirrorComponent();
  codeContent: string = '';

  @ViewChild('outputRef', { read: ElementRef, static: true })
  outputRef: ElementRef = inject(ElementRef).nativeElement;
  definedJS: string = `    
      // 以下代码是模拟运行时环境，辅助编写代码，不让代码出错，请不要删除，也不要在设计时加入到代码中。
      var Console = { 
          log: function (message) { }
      };
      var JSON = { 
        parse: function (content) { return ""; } 
      }; 
      var DataSource ={DataSet:""};
      var Device = {
        SetField: function (fieldName, fieldValue)
          {
          },
          SetWrittenField: function (fieldName, fieldValue)
          {
          }
      };
      var DevicesProxy = 
      { 
          GetData: function (deviceName, fieldName)
          {
                return ""; 
          }
      };
      `;
  constructor() {}

  submit() {
    try {
      let code = this.cmJsTool.getCode();
      if (code == null || code.trim() == '') {
        return;
      }
      //this.output = "";
      var result = eval(this.definedJS + code);
      //this.outputRef.innerHTML += "脚本执行结果："+result +"<br/>";
      this.outputRef.nativeElement.innerHTML += "<span style='color:green'>脚本检查结果：没有错误，可以继续进行下一步操作。</span><br/>";
      if (result != null) {
        this.outputRef.nativeElement.innerHTML += `${result}<br/>`;
      }

      //this.output = JSON.stringify(result, null, 4);
    } catch (e: any) {
      console.log(e);
      this.outputRef.nativeElement.innerHTML += "<span style='color:red'>脚本检查结果：有错误，请根据提示修改脚本。</span><br/>";
      this.outputRef.nativeElement.innerHTML += `<span style='color:red'>${e.message}</span><br/>`;
    }
    this.outputRef.nativeElement.scrollTop = this.outputRef.nativeElement.scrollHeight;
  }
  ngOnInit(): void {
    this.codeContent = `DevicesProxy.GetData("Device1", "Field1");`;
  }
}
