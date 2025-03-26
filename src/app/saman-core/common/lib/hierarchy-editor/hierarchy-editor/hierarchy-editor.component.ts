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
import { CardinalityTypeEnum } from '../cardinality-type.enum';
import { BG_COLOR, CardinalityTypeProperties, FG_COLOR } from '../cardinality-type.properties';
import { EntityTypeEnum } from '../entity-type.enum';
import { EntityTypeProperties } from '../entity-type.properties';

@Component({
  selector: 'app-hierarchy-editor',
  templateUrl: './hierarchy-editor.component.html',
  styleUrl: './hierarchy-editor.component.scss',
})
export class HierarchyEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() graphJsonBase64: string = '';
  @Output() actionEmitter = new EventEmitter<ActionHierarchyType>();

  private graph: dia.Graph;
  private paper: dia.Paper;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly _dialog: MatDialog,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  public ngOnInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: shapes });

    this.paper = new dia.Paper({
      width: 'calc(100%)',
      model: this.graph,
      cellViewNamespace: shapes,
      defaultConnector: { name: 'smooth' },
      interactive: { linkMove: false },
      background: { color: BG_COLOR },
      labelsLayer: true,
      frozen: true,
    });

    this._addToolsToView(this.paper, this.graph);
  }

  public ngAfterViewInit(): void {
    const graphJson = Buffer.from(this.graphJsonBase64, 'base64').toString('utf-8');
    this.canvas.nativeElement.appendChild(this.paper.el);
    if (graphJson !== '{}') this.graph.fromJSON(JSON.parse(graphJson));
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
        this._createState(30, 30, response.name, response.comment, response.stateType);
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
          response.cardinalitySource,
          response.cardinalityTarget,
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
        this._updateState(state, response.name, response.comment, response.stateType);
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
          response.cardinalitySource,
          response.cardinalityTarget,
        );
      }
    });
  }

  private _updateState(
    state: dia.Element,
    label: string,
    comment: string,
    stateType: EntityTypeEnum,
  ) {
    state.set('name', label);
    state.set('comment', comment);
    state.set('stateType', stateType);
    state.prop('attrs', this._createStateAttrs(label, stateType));
  }

  private _updateLink(
    link: dia.Link,
    source: dia.Element,
    target: dia.Element,
    name: string,
    cardinalitySource: CardinalityTypeEnum,
    cardinalityTarget: CardinalityTypeEnum,
  ) {
    link.source(source);
    link.target(target);
    link.set('name', name);
    link.set('cardinalitySource', cardinalitySource);
    link.set('cardinalityTarget', cardinalityTarget);
    link.label(0, this._createLinkLabel(name));
    link.set('attrs', this._createLinkAttrs(cardinalitySource, cardinalityTarget));
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
    comment: string,
    stateType: EntityTypeEnum,
  ): dia.Element {
    const state = new shapes.standard.Rectangle({
      position: { x: x, y: y },
      size: { width: 130, height: 50 },
    });
    state.set('name', label);
    state.set('comment', comment);
    state.set('stateType', stateType);
    state.prop('attrs', this._createStateAttrs(label, stateType));
    return state.addTo(this.graph);
  }

  private _createStateAttrs(label: string, type: EntityTypeEnum): object {
    const bodyColor = EntityTypeProperties[type].bodyColor;
    const lineColor = EntityTypeProperties[type].lineColor;
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

  private _createLink(
    source: dia.Element,
    target: dia.Element,
    label: string,
    cardinalitySource: CardinalityTypeEnum,
    cardinalityTarget: CardinalityTypeEnum,
    vertices = [],
  ): void {
    const link = new shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      attrs: this._createLinkAttrs(cardinalitySource, cardinalityTarget),
      vertices: vertices,
    });
    link.set('name', label);
    link.set('cardinalitySource', cardinalitySource);
    link.set('cardinalityTarget', cardinalityTarget);
    link.label(0, this._createLinkLabel(label));
    link.addTo(this.graph);
    if (link.source().id === link.target().id && link.vertices().length === 0)
      this._adjustVertices(link);
  }

  private _createLinkAttrs(
    cardinalitySource: CardinalityTypeEnum,
    cardinalityTarget: CardinalityTypeEnum,
  ): object {
    return {
      root: {
        title: `Marker`,
      },
      line: {
        stroke: FG_COLOR,
        strokeWidth: 2,
        sourceMarker: CardinalityTypeProperties[cardinalitySource],
        targetMarker: CardinalityTypeProperties[cardinalityTarget],
      },
      wrapper: {
        strokeWidth: 15,
      },
    };
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

export type ActionHierarchyType = {
  action: 'save' | 'cancel';
  dataBase64?: string;
};
