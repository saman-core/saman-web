import {
  AfterViewInit,
  OnInit,
  Component,
  ElementRef,
  ViewChild,
  Inject,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { dia, shapes, linkTools, elementTools, util, g } from '@joint/core';
import { StateTypeProperties } from '../state-type.properties';
import { StateTypeEnum } from '../state-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { StateDialogComponent, StateDialogResponse } from '../state-dialog/state-dialog.component';
import {
  TransitionDialogComponent,
  TransitionDialogResponse,
} from '../transition-dialog/transition-dialog.component';
import { COLORS, FA } from '../utils/icons.constants';
import {
  DeleteConfirmationDialogComponent,
  DeleteConfirmationDialogResponse,
} from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Buffer } from 'buffer';

@Component({
    selector: 'app-workflow-editor',
    templateUrl: './workflow-editor.component.html',
    styleUrl: './workflow-editor.component.scss',
    standalone: false
})
export class WorkflowEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() graphJsonBase64: string = '';
  @Output() actionEmitter = new EventEmitter<ActionWorkflowType>();

  private graph: dia.Graph;
  private paper: dia.Paper;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private _dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public ngOnInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: shapes });

    this.paper = new dia.Paper({
      width: 'calc(100%)',
      model: this.graph,
      cellViewNamespace: shapes,
      defaultConnector: { name: 'smooth' },
      interactive: { linkMove: false },
      labelsLayer: true,
      frozen: true,
    });

    this._addToolsToView(this.paper, this.graph);
  }

  public ngAfterViewInit(): void {
    const graphJson = Buffer.from(this.graphJsonBase64, 'base64').toString('utf-8');
    this.canvas.nativeElement.appendChild(this.paper.el);
    if (graphJson === '{}') this._initState(50, 200);
    else this.graph.fromJSON(JSON.parse(graphJson));
    this.paper.unfreeze();
  }

  save(): void {
    this.actionEmitter.emit({
      action: 'save',
      dataBase64: Buffer.from(JSON.stringify(this.graph.toJSON()), 'utf-8').toString('base64'),
    });
  }

  cancel(): void {
    this.actionEmitter.emit({ action: 'cancel' });
  }

  createState() {
    const dialogRef = this._dialog.open(StateDialogComponent, {
      data: { action: 'Create', productName: 'Auto', states: this.graph.getElements() },
      height: '400px',
      width: '700px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: StateDialogResponse) => {
      if (response.accepted) {
        this._createState(30, 30, response.name, response.stateType, response.roles, response.data);
      }
    });
  }

  createTransition() {
    const dialogRef = this._dialog.open(TransitionDialogComponent, {
      data: {
        action: 'Create',
        productName: 'Auto',
        states: this.graph.getElements(),
        links: this.graph.getLinks(),
      },
      height: '600px',
      width: '800px',
      disableClose: true,
      viewContainerRef: this.viewContainerRef,
      componentFactoryResolver: this.componentFactoryResolver,
    });
    dialogRef.afterClosed().subscribe((response: TransitionDialogResponse) => {
      if (response.accepted) {
        this._createLink(
          response.sourceState,
          response.targetState,
          response.name,
          response.roles,
          response.data,
        );
      }
    });
  }

  updateState(state: dia.Element) {
    const dialogRef = this._dialog.open(StateDialogComponent, {
      data: {
        action: 'Update',
        productName: 'Auto',
        states: this.graph.getElements(),
        stateToUpdate: state,
      },
      height: '400px',
      width: '700px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: StateDialogResponse) => {
      if (response.accepted) {
        this._updateState(state, response.name, response.stateType, response.data, response.roles);
      }
    });
  }

  updateTransition(link: dia.Link) {
    const dialogRef = this._dialog.open(TransitionDialogComponent, {
      data: {
        action: 'Update',
        productName: 'Auto',
        states: this.graph.getElements(),
        links: this.graph.getLinks(),
        linkToUpdate: link,
      },
      height: '600px',
      width: '800px',
      disableClose: true,
      viewContainerRef: this.viewContainerRef,
      componentFactoryResolver: this.componentFactoryResolver,
    });
    dialogRef.afterClosed().subscribe((response: TransitionDialogResponse) => {
      if (response.accepted) {
        this._updateLink(
          link,
          response.sourceState,
          response.targetState,
          response.name,
          response.roles,
          response.data,
        );
      }
    });
  }

  private _updateState(
    state: dia.Element,
    label: string,
    type: StateTypeEnum,
    data: object,
    roles: string[],
  ) {
    state.set('name', label);
    state.set('stateType', type);
    state.prop('attrs', this._createStateAttrs(label, type));
    state.set('data', data);
    state.set('roles', roles);
  }

  private _updateLink(
    link: dia.Link,
    source: dia.Element,
    target: dia.Element,
    name: string,
    roles: string[],
    data: object,
  ) {
    link.source(source);
    link.target(target);
    link.set('name', name);
    link.set('data', data);
    link.label(0, this._createLinkLabel(name));
    link.set('roles', roles);
  }

  private _addToolsToView(paper: dia.Paper, graph: dia.Graph): void {
    this.paper.on('element:label:pointerdown', function (_view, evt) {
      evt.stopPropagation();
    });

    this.paper.on('cell:pointerdown blank:pointerdown', function () {
      graph.getElements().forEach((v) => v.findView(paper).removeTools());
      graph.getLinks().forEach((v) => v.findView(paper).removeTools());
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (this.document.selection) {
        this.document.selection.empty();
      }
    });

    const linkToolsView = this._linksToolsView();
    this.paper.on('link:contextmenu', function (linkView) {
      if (linkView.hasTools()) linkView.removeTools();
      else {
        graph.getElements().forEach((v) => v.findView(paper).removeTools());
        graph.getLinks().forEach((v) => v.findView(paper).removeTools());
        linkView.addTools(linkToolsView);
      }
    });

    const elementToolsView = this._elementToolsView();
    this.paper.on('element:contextmenu', function (elementView) {
      if (elementView.model.attributes['isImmutable'] === true) return;

      if (elementView.hasTools()) elementView.removeTools();
      else {
        graph.getElements().forEach((v) => v.findView(paper).removeTools());
        graph.getLinks().forEach((v) => v.findView(paper).removeTools());
        elementView.addTools(elementToolsView);
      }
    });
  }

  private _createState(
    x: number,
    y: number,
    label: string,
    type: StateTypeEnum,
    roles: string[],
    data: object = {},
  ): dia.Element {
    const state = new shapes.standard.Rectangle({
      position: { x: x, y: y },
      size: { width: 130, height: 50 },
    });
    state.set('name', label);
    state.set('data', data);
    state.set('stateType', type);
    state.prop('attrs', this._createStateAttrs(label, type));
    state.set('roles', roles);
    return state.addTo(this.graph);
  }

  private _createStateAttrs(label: string, type: StateTypeEnum): object {
    const bodyColor = StateTypeProperties[type].bodyColor;
    const lineColor = StateTypeProperties[type].lineColor;
    return {
      label: {
        text: label,
        event: 'element:label:pointerdown',
        fontWeight: 'bold',
        fill: '#333333',
        style: {
          userSelect: 'text',
        },
      },
      body: {
        rx: 13,
        ry: 13,
        fill: bodyColor,
        stroke: lineColor,
        strokeWidth: 2,
      },
    };
  }

  private _initState(x: number, y: number): dia.Element {
    const name = 'START';
    let label = name;
    //TODO for message icons
    if (false) label = `${name} ${FA.envelope}`;
    const start = new shapes.standard.Circle({
      position: { x: x, y: y },
      size: { width: 70, height: 70 },
      attrs: {
        body: {
          fill: '#647687',
          filter: {
            name: 'highlight',
            args: {
              color: '#314354',
              width: 2,
              opacity: 0.8,
              blur: 4,
            },
          },
        },
        label: {
          text: label,
          fill: 'white',
          event: 'element:label:pointerdown',
          fontWeight: 'bold',
          annotations: [
            {
              start: name.length + 1,
              end: label.length,
              attrs: {
                fill: COLORS.light,
                'font-family': 'FontAwesome',
                'font-size': 20,
              },
            },
          ],
        },
      },
    });
    start.set('isImmutable', true);
    start.set('name', name);
    start.set('roles', []);
    return start.addTo(this.graph);
  }

  private _createLink(
    source: dia.Element,
    target: dia.Element,
    label: string,
    roles: string[],
    data: object = {},
    vertices = [],
  ): void {
    const link = new shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: '#999999',
          //TODO for automatic transictions
          //strokeDasharray: '9,2',
        },
      },
      vertices: vertices,
    });
    link.set('name', label);
    link.set('data', data);
    link.label(0, this._createLinkLabel(label));
    link.addTo(this.graph);
    link.set('roles', roles);
    if (link.source().id === link.target().id && link.vertices().length === 0)
      this._adjustVertices(link);
  }

  private _createLinkLabel(name: string): object {
    return {
      position: {
        distance: 0.5,
        offset: 0,
        args: {
          keepGradient: true,
          ensureLegibility: true,
        },
      },
      attrs: {
        text: {
          text: name,
          fontWeight: 'bold',
        },
      },
    };
    /* TODO for indicate message
    {
      attrs: {
        text: {
          fill: COLORS.dark,
          text: FA.envelope,
          fontFamily: "FontAwesome"
        },
        rect: { fill: COLORS.light }
      },
      position: {
        distance: 0.5,
        offset: 20,
      },
    };
    */
  }

  private _linksToolsView(): dia.ToolsView {
    const verticesTool = new linkTools.Vertices();
    const sourceAnchorTool = new linkTools.SourceAnchor();
    const targetAnchorTool = new linkTools.TargetAnchor();
    const boundaryTool = new linkTools.Boundary();
    const RemoveButton = linkTools.Button.extend({
      attributes: {
        cursor: 'pointer',
        class: 'fa-small-button',
      },
      children: util.svg`
            <text fill="${COLORS.dark}" font-size="20" font-family="FontAwesome" font-weight="400" text-anchor="middle" x="-13" y="0">${FA['chain-broken']}</text>
        `,
    });
    const InfoButton = linkTools.Button.extend({
      attributes: {
        cursor: 'pointer',
        class: 'fa-small-button',
      },
      children: util.svg`
            <text fill="${COLORS.dark}" font-size="20" font-family="FontAwesome" font-weight="400" text-anchor="middle" x="13" y="0">${FA['pencil-square-o']}</text>
        `,
    });

    const fn = (transition) => this.updateTransition(transition);
    const deleteFn = (typeName: string, state: dia.Element) => this._delete(typeName, state);
    return new dia.ToolsView({
      tools: [
        new InfoButton({
          distance: '50%',
          offset: -20,
          action() {
            fn(this.model);
          },
        }),
        new RemoveButton({
          distance: '50%',
          offset: -20,
          action() {
            deleteFn('Link', this.model);
          },
        }),
        verticesTool,
        sourceAnchorTool,
        targetAnchorTool,
        boundaryTool,
      ],
    });
  }

  private _elementToolsView(): dia.ToolsView {
    const boundaryTool = new elementTools.Boundary();
    const RemoveButton = elementTools.Button.extend({
      attributes: {
        cursor: 'pointer',
        class: 'fa-small-button',
      },
      children: util.svg`
            <text fill="${COLORS.dark}" font-size="20" font-family="FontAwesome" font-weight="400" text-anchor="middle" x="-13" y="0">${FA.trash}</text>
        `,
    });
    const ResizeTool = elementTools.Control.extend({
      children: [
        {
          tagName: 'text',
          children: [FA.expand],
          selector: 'handle',
          namespaceURI: 'http://www.w3.org/2000/svg',
          attributes: {
            cursor: 'pointer',
            fill: COLORS.dark,
            'font-size': '20',
            'font-family': 'FontAwesome',
            'font-weight': '400',
            'text-anchor': 'middle',
            x: 13,
            y: 13,
          },
        },
        {
          tagName: 'rect',
          selector: 'extras',
          attributes: {
            'pointer-events': 'none',
            fill: 'none',
            stroke: '#33334F',
            'stroke-dasharray': '2,4',
            rx: 5,
            ry: 5,
          },
        },
      ],
      getPosition: function (view) {
        const model = view.model;
        const { width, height } = model.size();
        return { x: width, y: height };
      },
      setPosition: function (view, coordinates) {
        const model = view.model;
        model.resize(Math.max(coordinates.x - 10, 1), Math.max(coordinates.y - 10, 1));
      },
    });
    const InfoButton = elementTools.Button.extend({
      attributes: {
        cursor: 'pointer',
        class: 'fa-small-button',
      },
      children: util.svg`
            <text fill="${COLORS.dark}" font-size="20" font-family="FontAwesome" font-weight="400" text-anchor="middle" x="13" y="0">${FA['pencil-square-o']}</text>
        `,
    });

    const fn = (state) => this.updateState(state);
    const deleteFn = (typeName: string, state: dia.Element) => this._delete(typeName, state);
    return new dia.ToolsView({
      tools: [
        new InfoButton({
          x: '100%',
          y: '0',
          offset: 0,
          action() {
            fn(this.model);
          },
        }),
        boundaryTool,
        new RemoveButton({
          x: '0',
          y: '0',
          offset: 0,
          action() {
            deleteFn('State', this.model);
          },
        }),
        new ResizeTool({
          selector: 'body',
        }),
      ],
    });
  }

  private _delete(typeName: string, state: dia.Element): void {
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent, {
      data: { typeName: typeName, name: state.get('name') },
      height: '200px',
      width: '300px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: DeleteConfirmationDialogResponse) => {
      if (response.accepted) {
        state.remove();
      }
    });
  }

  private _adjustVertices(link: shapes.standard.Link): void {
    const leftMiddle = link.getSourceCell().getBBox().leftMiddle();
    const rightMiddle = link.getTargetCell().getBBox().rightMiddle();

    const num = 6;
    const distance = 10;
    const min = 30;
    const offset = Math.floor(Math.random() * num) * distance + min;

    const angle = g.toRad(90);
    const vertexL = g.Point.fromPolar(offset, angle, leftMiddle);
    const vertexR = g.Point.fromPolar(offset, angle, rightMiddle);

    link.vertices([vertexL, vertexR]);
  }
}

export type ActionWorkflowType = {
  action: 'save' | 'cancel';
  dataBase64?: string;
};
