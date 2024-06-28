import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { dia, shapes, linkTools } from '@joint/core';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
})
export class WorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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

    this.paper.on('element:label:pointerdown', function (_view, evt) {
      // Prevent user from moving the element when interacting with the label element
      evt.stopPropagation();
    });

    this.paper.on('cell:pointerdown blank:pointerdown', function () {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else if (this.document.selection) {
        this.document.selection.empty();
      }
    });

    const linkToolsView = this.getLinkToolsView();
    this.paper.on('link:mouseenter', function (linkView) {
      linkView.addTools(linkToolsView);
    });

    this.paper.on('link:mouseleave', function (linkView) {
      linkView.removeTools();
    });
  }

  public ngAfterViewInit(): void {
    this.canvas.nativeElement.appendChild(this.paper.el);
    const start = this.initState(50, 530);
    const code = this.state(180, 390, 'code');
    const slash = this.state(340, 220, 'slash');
    const star = this.state(600, 400, 'star');
    const line = this.state(190, 100, 'line');
    const block = this.state(560, 140, 'block');

    this.link(start, code, 'start');
    this.link(code, slash, '/');
    this.link(slash, code, 'other', [{ x: 270, y: 300 }]);
    this.link(slash, line, '/');
    this.link(line, code, 'new\n line');
    this.link(slash, block, '*');
    this.link(block, star, '*');
    this.link(star, block, 'other', [{ x: 650, y: 290 }]);
    this.link(star, code, 'C', [{ x: 490, y: 310 }]);
    this.link(line, line, 'other', [
      { x: 115, y: 100 },
      { x: 250, y: 50 },
    ]);
    this.link(block, block, 'other', [
      { x: 485, y: 140 },
      { x: 620, y: 90 },
    ]);
    this.link(code, code, 'other', [
      { x: 180, y: 500 },
      { x: 305, y: 450 },
    ]);

    this.paper.unfreeze();

    console.log(this.graph.toJSON());
  }

  state(x, y, label) {
    const circle = new shapes.standard.Circle({
      position: { x: x, y: y },
      size: { width: 60, height: 60 },
      attrs: {
        label: {
          text: label,
          event: 'element:label:pointerdown',
          fontWeight: 'bold',
          cursor: 'text',
          style: {
            userSelect: 'text',
          },
        },
        body: {
          strokeWidth: 3,
        },
      },
    });
    return circle.addTo(this.graph);
  }

  initState(x, y) {
    const start = new shapes.standard.Circle({
      position: { x: x, y: y },
      size: { width: 20, height: 20 },
      attrs: {
        body: {
          fill: '#333333',
        },
      },
    });
    return start.addTo(this.graph);
  }

  link(source, target, label, vertices = []) {
    const link = new shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      attrs: {
        line: {
          strokeWidth: 2,
        },
      },
      labels: [
        {
          position: {
            distance: 0.5,
            offset: label.indexOf('\n') > -1 || label.length === 1 ? 0 : 10,
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
      vertices: vertices || [],
    });
    link.addTo(this.graph);
  }

  getLinkToolsView(): dia.ToolsView {
    const verticesTool = new linkTools.Vertices();
    const segmentsTool = new linkTools.Segments();
    const sourceArrowheadTool = new linkTools.SourceArrowhead();
    const targetArrowheadTool = new linkTools.TargetArrowhead();
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
        segmentsTool,
        sourceArrowheadTool,
        targetArrowheadTool,
        sourceAnchorTool,
        targetAnchorTool,
        boundaryTool,
        removeButton,
      ],
    });
  }
}
