import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StandaloneEditorApi } from '@kie-tools/kie-editors-standalone/dist/common/Editor';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';
import { Observable, from, map } from 'rxjs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss',
})
export class DmnEditorComponent implements OnInit {
  @ViewChild('dmn', { static: true }) dmnDiv?: ElementRef;
  editor: StandaloneEditorApi;
  @Input() dmnData: string = '';
  @Input() readOnly: boolean = false;

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(Buffer.from(this.dmnData, 'base64').toString('utf-8')),
      readOnly: this.readOnly,
    });
  }

  getContent(): Observable<string> {
    return from(this.editor.getContent()).pipe(map(xml => Buffer.from(xml, 'utf-8').toString('base64')));
  }

  markAsSaved(): void {
    this.editor.markAsSaved();
  }
}
