import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { dia, shapes, linkTools, elementTools } from '@joint/core';
import { StateTypeProperties } from '../state-type.properties';
import { StateTypeEnum } from '../state-type.enum';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateStateDialogComponent,
  CreateStateDialogResponse,
} from '../create-state-dialog/create-state-dialog.component';
import {
  CreateTransitionDialogComponent,
  CreateTransitionDialogResponse,
} from '../create-transition-dialog/create-transition-dialog.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
})
export class WorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;

  constructor(
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
    this.canvas.nativeElement.appendChild(this.paper.el);
    const start = this._initState(50, 200);
    const code = this._createState(180, 390, 'code', StateTypeEnum.IN_PROGRESS);
    const slash = this._createState(340, 220, 'slash', StateTypeEnum.COMPLETED);
    const star = this._createState(600, 400, 'star', StateTypeEnum.PENDING);
    const line = this._createState(190, 100, 'line', StateTypeEnum.COMPLETED);
    const block = this._createState(560, 140, 'block', StateTypeEnum.EXCLUDED);

    this._createLink(start, code, 'start');
    this._createLink(code, slash, '/');
    this._createLink(slash, code, 'other', [{ x: 270, y: 300 }]);
    this._createLink(slash, line, '/');
    this._createLink(line, code, 'new\n line');
    this._createLink(slash, block, '*');
    this._createLink(block, star, '*');
    this._createLink(star, block, 'other', [{ x: 650, y: 290 }]);
    this._createLink(star, code, 'C', [{ x: 490, y: 310 }]);
    this._createLink(line, line, 'other', [
      { x: 115, y: 100 },
      { x: 250, y: 50 },
    ]);
    this._createLink(block, block, 'other', [
      { x: 485, y: 140 },
      { x: 620, y: 90 },
    ]);
    this._createLink(code, code, 'other', [
      { x: 180, y: 500 },
      { x: 305, y: 450 },
    ]);

    this.paper.unfreeze();

    console.log(this.graph.toJSON());
  }

  createState() {
    const dialogRef = this._dialog.open(CreateStateDialogComponent, {
      data: { productName: 'Auto' },
      height: '80%',
      width: '80%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: CreateStateDialogResponse) => {
      if (response.accepted) {
        this._createState(30, 30, response.name, response.stateType);
      }
    });
  }

  createTransition() {
    const dialogRef = this._dialog.open(CreateTransitionDialogComponent, {
      data: { productName: 'Auto' },
      height: '80%',
      width: '80%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((response: CreateTransitionDialogResponse) => {
      if (response.accepted) {
        this._createState(30, 30, response.name, response.stateType);
      }
    });
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

  private _createState(x: number, y: number, label: string, type: StateTypeEnum): dia.Element {
    const bodyColor = StateTypeProperties[type].bodyColor;
    const lineColor = StateTypeProperties[type].lineColor;
    const state = new shapes.standard.Rectangle({
      position: { x: x, y: y },
      size: { width: 110, height: 40 },
      attrs: {
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
          rx: 20,
          ry: 20,
          fill: bodyColor,
          stroke: lineColor,
          strokeWidth: 2,
          filter: {
            name: 'dropShadow',
            args: {
              dx: 2,
              dy: 2,
              blur: 3,
            },
          },
        },
      },
    });
    return state.addTo(this.graph);
  }

  private _initState(x: number, y: number): dia.Element {
    const start = new shapes.standard.Circle({
      position: { x: x, y: y },
      size: { width: 60, height: 60 },
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
          text: 'START',
          fill: 'white',
          event: 'element:label:pointerdown',
          fontWeight: 'bold',
        },
      },
    });
    start.set('isImmutable', true);
    return start.addTo(this.graph);
  }

  private _createLink(
    source: dia.Element,
    target: dia.Element,
    label: string,
    vertices = [],
  ): void {
    const link = new shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: '#999999',
          strokeDasharray: '9,2',
        },
      },
      labels: [
        {
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
              text: label,
              fontWeight: 'bold',
            },
          },
        },
      ],
      vertices: vertices,
    });
    link.addTo(this.graph);
  }

  private _linksToolsView(): dia.ToolsView {
    const verticesTool = new linkTools.Vertices();
    const sourceAnchorTool = new linkTools.SourceAnchor();
    const targetAnchorTool = new linkTools.TargetAnchor();
    const boundaryTool = new linkTools.Boundary();
    const removeButton = new linkTools.Remove();
    const infoButton = new linkTools.Button({
      markup: [
        {
          tagName: 'circle',
          selector: 'button',
          attributes: {
            r: 7,
            fill: '#001DFF',
            cursor: 'pointer',
          },
        },
        {
          tagName: 'path',
          selector: 'icon',
          attributes: {
            d: 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
            fill: 'none',
            stroke: '#FFFFFF',
            'stroke-width': 2,
            'pointer-events': 'none',
          },
        },
      ],
      distance: 90,
      offset: 10,
      action: function () {
        alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
      },
    });

    return new dia.ToolsView({
      tools: [
        infoButton,
        verticesTool,
        sourceAnchorTool,
        targetAnchorTool,
        boundaryTool,
        removeButton,
      ],
    });
  }

  private _elementToolsView(): dia.ToolsView {
    const boundaryTool = new elementTools.Boundary();
    const removeButton = new elementTools.Remove();
    const infoButton = new elementTools.Button({
      name: 'info-button',
      options: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attributes: {
              r: 7,
              fill: '#001DFF',
              cursor: 'pointer',
            },
          },
          {
            tagName: 'path',
            selector: 'icon',
            attributes: {
              d: 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
              fill: 'none',
              stroke: '#FFFFFF',
              'stroke-width': 2,
              'pointer-events': 'none',
            },
          },
        ],
        x: '100%',
        y: '100%',
        offset: {
          x: 0,
          y: 0,
        },
        rotate: true,
        action: function () {
          alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
        },
      },
    });

    return new dia.ToolsView({
      tools: [infoButton, boundaryTool, removeButton],
    });
  }
}
