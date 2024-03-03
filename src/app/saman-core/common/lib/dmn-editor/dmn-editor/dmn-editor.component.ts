import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StandaloneEditorApi } from '@kie-tools/kie-editors-standalone/dist/common/Editor';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';
import { Observable, from, map } from 'rxjs';

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
      initialContent: Promise.resolve(atob(this.dmnData)),
      readOnly: this.readOnly,
    });
  }

  getContent(): Observable<string> {
    return from(this.editor.getContent()).pipe(map((xml) => btoa(xml)));
  }

  markAsSaved(): void {
    this.editor.markAsSaved();
  }
}
