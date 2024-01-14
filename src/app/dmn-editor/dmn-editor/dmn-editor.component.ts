import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as DmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn"

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss'
})
export class DmnEditorComponent implements OnInit {
  @ViewChild('dmn', {static: true}) dmnDiv?: ElementRef;
  editor: any;

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: document.getElementById("dmn"),
      initialContent: Promise.resolve(""),
      readOnly: false,
      origin: window.location.origin + '/assets',
      resources: new Map([
        [
          "MyIncludedModel.dmn",
          {
            contentType: "text",
            content: Promise.resolve("")
          }
        ]
      ])
    });
  }
}
