/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formio } from '@formio/angular';
import editForm from './saman-datetime.form';

const Component = (Formio as any).Components.components.datetime;

export default class SamanDateTimeComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'samanDatetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: 'yyyy-MM-dd hh:mm a',
      useLocaleSettings: false,
      allowInput: true,
      enableDate: true,
      enableTime: true,
      defaultValue: '',
      defaultDate: '',
      displayInTimezone: 'viewer',
      timezone: '',
      datepickerMode: 'day',
      datePicker: {
        showWeeks: true,
        startingDay: 0,
        initDate: '',
        minMode: 'day',
        maxMode: 'year',
        yearRows: 4,
        yearColumns: 5,
        minDate: null,
        maxDate: null
      },
      timePicker: {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: true,
        readonlyInput: false,
        mousewheel: true,
        arrowkeys: true
      },
      customOptions: {},
    }, ...extend);
  }
  
  static get builderInfo() {
    return {
      title: 'Date / Time',
      group: 'advanced',
      icon: 'calendar',
      documentation: '/userguide/form-building/advanced-components#date-and-time',
      weight: 40,
      schema: SamanDateTimeComponent.schema()
    };
  }

  static editForm = editForm;
}
