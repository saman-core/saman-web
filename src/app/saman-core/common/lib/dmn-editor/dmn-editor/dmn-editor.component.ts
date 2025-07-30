import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { DmnEditorStandaloneApi } from '@ibm/bamoe-standalone-dmn-editor/dist';
import * as DmnEditor from '@ibm/bamoe-standalone-dmn-editor/dist';
import { Observable, from, map } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmnAiRepository } from '@saman-core/data';
import { SYSTEM_TABLE } from '../common-model';
import { AlertSubscriptor } from '@saman-core/core';
import { MatFormField, MatLabel, MatPrefix, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss',
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatPrefix,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix,
  ],
})
export class DmnEditorComponent implements OnInit {
  private readonly _dmnAiRepostory = inject(DmnAiRepository);
  private readonly _alert = inject(AlertSubscriptor);

  @ViewChild('dmn', { static: true }) dmnDiv?: ElementRef;
  editor: DmnEditorStandaloneApi;
  @Input() dmnData: string = '';
  @Input() readOnly: boolean = false;
  @Input() dmnName: string = '';
  @Input() namespace: string = '';
  message = new FormControl('');

  ngOnInit(): void {
    this.editor = this.openEditor(this._replaceBase64ParametersAndCode(this.dmnData));
  }

  openEditor(data: string) {
    return DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(data),
      readOnly: this.readOnly,
      resources: new Map([
        [
          'systemTable.dmn',
          {
            contentType: 'text',
            content: Promise.resolve(SYSTEM_TABLE),
          },
        ],
      ]),
    });
  }

  getContent(): Observable<string> {
    return from(this.editor.getContent()).pipe(
      map((xml) => this._replaceXmlParametersAndCode(xml)),
    );
  }

  private _replaceXmlParametersAndCode(xml: string): string {
    xml = xml.replace(/name="\S+"/, `name="${this.dmnName}"`);
    xml = xml.replace(/namespace="\S+"/, `namespace="${this.namespace}/${this.dmnName}"`);
    return btoa(unescape(encodeURIComponent(xml)));
  }

  private _replaceBase64ParametersAndCode(base64: string): string {
    let xml = decodeURIComponent(escape(atob(base64)));
    xml = xml.replace(/name="\S+"/, `name="${this.dmnName}"`);
    return xml.replace(/namespace="\S+"/, `namespace="${this.namespace}/${this.dmnName}"`);
  }

  markAsSaved(): void {
    this.editor.markAsSaved();
  }

  sendMessage(): void {
    this.editor.getContent().then((prevContent) => {
      this._dmnAiRepostory
        .generate({ message: this.message.value, initialModel: prevContent })
        .subscribe((response) => {
          const res = this.editor.setContent('/', response.data);
          res.then(
            () => {
              this._alert.info(response.message);
            },
            (err) => {
              console.warn(response);
              console.error(err);
              this.editor.close();
              this.editor = this.openEditor(prevContent);
            },
          );
        });
    });
  }
}
