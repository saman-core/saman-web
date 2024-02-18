import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { StandaloneEditorApi } from '@kie-tools/kie-editors-standalone/dist/common/Editor';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss'
})
export class DmnEditorComponent implements OnInit {
  @ViewChild('dmn', {static: true}) dmnDiv?: ElementRef;
  editor: StandaloneEditorApi;
  @Input() dmnData: string = '';
  @Input() readOnly: boolean = false;
  @Output() newDmnData = new EventEmitter<string>();

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(atob(this.dmnData)),
      readOnly: this.readOnly
    });
  }

  save(): void {
    this.editor.getContent().then((val) => {
      this.newDmnData.emit(btoa(val));
      this.editor.markAsSaved();
    }).catch((reason) => {
      console.error(`Handle rejected promise (${reason}) here.`);
    });
  }
}
