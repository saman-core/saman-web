import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss'
})
export class DmnEditorComponent implements OnInit {
  @ViewChild('dmn', {static: true}) dmnDiv?: ElementRef;
  editor: any;
  @Input() dmnData: string = '';

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(this.dmnData),
      readOnly: false
    });
  }
}
