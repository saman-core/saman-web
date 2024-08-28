import { Component } from '@angular/core';
import { ActionWorkflowType } from '@saman-core/common';

@Component({
  selector: 'app-product-workflow',
  templateUrl: './product-workflow.component.html',
  styleUrl: './product-workflow.component.scss',
})
export class ProductWorkflowComponent {
  graphJson: object = {
    cells: [
      {
        type: 'standard.Circle',
        position: {
          x: 50,
          y: 200,
        },
        size: {
          width: 70,
          height: 70,
        },
        angle: 0,
        id: '302e9bed-73d0-45c1-a4e2-b54ad9c62c3f',
        isImmutable: true,
        name: 'START',
        z: 1,
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
            fill: 'white',
            text: 'START',
            event: 'element:label:pointerdown',
            fontWeight: 'bold',
            annotations: [
              {
                start: 6,
                end: 5,
                attrs: {
                  fill: '#dde6ed',
                  'font-family': 'FontAwesome',
                  'font-size': 20,
                },
              },
            ],
          },
        },
      },
      {
        type: 'standard.Rectangle',
        position: {
          x: 288,
          y: 214,
        },
        size: {
          width: 130,
          height: 50,
        },
        angle: 0,
        id: '8943ab6f-87fb-4fb2-989c-ad525c24e4f6',
        name: 'emitir',
        data: {},
        z: 2,
        attrs: {
          body: {
            stroke: '#6C8EBF',
            fill: '#DAE8FC',
            rx: 13,
            ry: 13,
          },
          label: {
            text: 'emitir',
            event: 'element:label:pointerdown',
            fontWeight: 'bold',
            style: {
              userSelect: 'text',
            },
          },
        },
      },
      {
        type: 'standard.Link',
        source: {
          id: '302e9bed-73d0-45c1-a4e2-b54ad9c62c3f',
        },
        target: {
          id: '8943ab6f-87fb-4fb2-989c-ad525c24e4f6',
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
                text: 'emit',
                fontWeight: 'bold',
              },
            },
          },
        ],
        vertices: [],
        id: 'da143095-d50b-410d-96cf-029e642b04f5',
        name: 'emit',
        data: {},
        z: 3,
        attrs: {
          line: {
            stroke: '#999999',
          },
        },
      },
      {
        type: 'standard.Rectangle',
        position: {
          x: 626,
          y: 215,
        },
        size: {
          width: 130,
          height: 50,
        },
        angle: 0,
        id: '1589a72e-ddce-4f39-83a6-962a9db06bb1',
        name: 'cancelar',
        data: {},
        z: 4,
        attrs: {
          body: {
            stroke: '#B85450',
            fill: '#F8CECC',
            rx: 13,
            ry: 13,
          },
          label: {
            text: 'cancelar',
            event: 'element:label:pointerdown',
            fontWeight: 'bold',
            style: {
              userSelect: 'text',
            },
          },
        },
      },
      {
        type: 'standard.Link',
        source: {
          id: '8943ab6f-87fb-4fb2-989c-ad525c24e4f6',
        },
        target: {
          id: '1589a72e-ddce-4f39-83a6-962a9db06bb1',
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
                text: 'cancel',
                fontWeight: 'bold',
              },
            },
          },
        ],
        vertices: [],
        id: 'c4ceef42-deac-4877-987b-e975fe5a0557',
        name: 'cancel',
        data: {},
        z: 5,
        attrs: {
          line: {
            stroke: '#999999',
          },
        },
      },
      {
        type: 'standard.Link',
        source: {
          id: '8943ab6f-87fb-4fb2-989c-ad525c24e4f6',
        },
        target: {
          id: '8943ab6f-87fb-4fb2-989c-ad525c24e4f6',
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
                text: 'endosar',
                fontWeight: 'bold',
              },
            },
          },
        ],
        vertices: [
          {
            x: 288,
            y: 179,
          },
          {
            x: 418,
            y: 179,
          },
        ],
        id: '25ca93f1-03c7-49d8-8f70-86a781736b68',
        name: 'endosar',
        data: {},
        z: 6,
        attrs: {
          line: {
            stroke: '#999999',
          },
        },
      },
    ],
  };

  constructor() {}

  actionsListener(action: ActionWorkflowType) {
    switch (action.action) {
      case 'save':
        console.log(action.data);
        break;
      case 'cancel':
        console.log('cancel');
        break;
    }
  }
}
