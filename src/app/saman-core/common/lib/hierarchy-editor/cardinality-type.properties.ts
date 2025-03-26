import { util } from '@joint/core';

export const BG_COLOR = '#f4f7f6';
export const FG_COLOR = '#131e29';

export const CardinalityTypeProperties = {
  ONE_MANDATORY: {
    markup: util.svg`
            <path d="M 5 -5 V 5 M 10 -5 V 5" stroke-width="2" fill="${FG_COLOR}" />
        `,
  },
  ONE_OPTIONAL: {
    markup: util.svg`
            <path d="M 5 -5 V 5" stroke-width="2" fill="none" />
            <circle cx="14" r="4" stroke-width="2" fill="${BG_COLOR}" />
        `,
  },
  MANY_MANDATORY: {
    markup: util.svg`
            <path d="M 0 -4 L 10 0 M 0 4 L 10 0 M 10 -5 V 5" stroke-width="2" />
        `,
  },
  MANY_OPTIONAL: {
    markup: util.svg`
            <path d="M 0 -4 L 10 0 M 0 4 L 10 0 M 0 0 H 10" stroke-width="2" fill="none" />
            <circle cx="14" r="3" fill="${BG_COLOR}" stroke-width="2" />
        `,
  },
};
