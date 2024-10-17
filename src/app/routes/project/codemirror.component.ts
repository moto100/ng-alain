import { ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, basicSetup } from 'codemirror';
@Component({
  selector: 'codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeMirrorComponent implements OnChanges {
  editor: EditorView | undefined;
  @ViewChild('codeRef', { read: ElementRef, static: true })
  codeRef: ElementRef | undefined;

  @Input() tooltip: string = '这是个提示消息！！';
  @Input() code: string = 'how are you?';
  @Input() height: string = '';
  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    if (this.editor) {
      this.editor.dispatch({
        changes: { from: 0, to: this.editor?.state.doc.length, insert: this.code }
      });
    } else {
      //console.log("editor is undefined");
      this.editor = new EditorView({
        doc: this.code,
        extensions: [basicSetup, javascript()],
        parent: this.codeRef?.nativeElement
      });
      if (this.height != '') {
        this.editor.dom.style.height = this.height;
        this.editor.dom.style.overflow = 'auto';
      } else {
        this.editor.dom.style.height = '100%';
        this.editor.dom.style.overflow = 'auto';
      }
    }
  }

  setCode(code: string) {
    // let state = EditorState.create({ doc: code, extensions: [basicSetup, javascript()] })
    // this.editor?.setState(state);
    if (this.editor) {
      this.editor.dispatch({
        changes: { from: 0, to: this.editor?.state.doc.length, insert: code }
      });
    } else {
      console.log('editor is undefined');
    }
    //this.cdr.detectChanges();
  }

  getCode(): string {
    if (this.editor) {
      return this.editor.state.doc.toString();
    } else {
      console.log('editor is undefined');
      return '';
    }
  }
}
