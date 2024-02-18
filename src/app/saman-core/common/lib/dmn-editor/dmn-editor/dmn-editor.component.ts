import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import * as DmnEditor from '@kie-tools/kie-editors-standalone/dist/dmn';
import { ResourceRepository } from '@saman-core/data';

@Component({
  selector: 'app-dmn-editor',
  templateUrl: './dmn-editor.component.html',
  styleUrl: './dmn-editor.component.scss'
})
export class DmnEditorComponent implements OnInit {
  @ViewChild('dmn', {static: true}) dmnDiv?: ElementRef;
  editor: any;
  @Input() dmnData: string = '';
  @Input() readOnly: boolean = false;
  @Output() newDmnData = new EventEmitter<string>();

  constructor(private productRepository: ResourceRepository) {
  }

  ngOnInit(): void {
    this.editor = DmnEditor.open({
      container: this.dmnDiv.nativeElement,
      initialContent: Promise.resolve(atob(this.dmnData)),
      readOnly: this.readOnly
    });
  }

  save(): void {
    this.productRepository.getProduct('auto').subscribe((data) => {
      console.log(data);
    });
    this.editor.getContent().then((val) => {
      console.log(btoa(val));
      this.editor.markAsSaved()
      this.newDmnData.emit(val);
      console.log(val);
    }).catch((reason) => {
      console.error(`Handle rejected promise (${reason}) here.`);
    });
  }
}
