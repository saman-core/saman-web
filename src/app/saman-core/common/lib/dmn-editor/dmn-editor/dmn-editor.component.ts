import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StandaloneEditorApi } from '@kie-tools/kie-editors-standalone/dist/common/Editor';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';
import { ContentType } from "@kie-tools-core/workspace/dist/api";
import { Observable, from, map } from 'rxjs';
import { Buffer } from 'buffer';
import { SYSTEM_TABLE } from '../common-model';

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
  @Input() dmnName: string = '';
  @Input() namespace: string = '';

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(this._replaceBase64ParametersAndCode(this.dmnData)),
      readOnly: this.readOnly,
      resources: new Map([
        [
          "systemTable.dmn",
          {
            contentType: ContentType.TEXT,
            content: Promise.resolve(SYSTEM_TABLE)
          }
        ],
      ]),
    });
  }

  getContent(): Observable<string> {
    return from(this.editor.getContent()).pipe(map((xml) => this._replaceXmlParametersAndCode(xml)));
  }

  private _replaceXmlParametersAndCode(xml: string): string {
    xml = xml.replace(/name="\S+"/, `name="${this.dmnName}"`);
    xml = xml.replace(/namespace="\S+"/, `namespace="${this.namespace}/${this.dmnName}"`);
    return Buffer.from(xml, 'utf-8').toString('base64');
  }

  private _replaceBase64ParametersAndCode(base64: string): string {
    let xml = Buffer.from(base64, 'base64').toString('utf-8');
    xml = xml.replace(/name="\S+"/, `name="${this.dmnName}"`);
    return xml.replace(/namespace="\S+"/, `namespace="${this.namespace}/${this.dmnName}"`);
  }

  markAsSaved(): void {
    this.editor.markAsSaved();
  }
}
