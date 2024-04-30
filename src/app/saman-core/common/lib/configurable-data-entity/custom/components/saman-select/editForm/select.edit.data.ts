export default [
  {
    key: 'dataSrc',
    data: {
      values: [
        { label: 'Values', value: 'values' },
        { label: 'Resource', value: 'resource' },
        { label: 'Raw JSON', value: 'json' },
      ],
    },
    onChange(context) {
      const dataSrc = context.instance.data.dataSrc;
      if (dataSrc === 'resource') {
        context.instance.root.getComponent('valueProperty').setValue('id');
      }
      if (dataSrc === 'values') {
        context.instance.root.getComponent('valueProperty').setValue('');
      }
    },
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 10,
    input: true,
    key: 'data.json',
    label: 'Data Source Raw JSON',
    tooltip: 'A valid JSON array to use as a data source.',
    description: '<div>Example: <pre>["apple", "banana", "orange"].</pre></div> <div>Example 2: <pre>[{"name": "John", "email": "john.doe@test.com"}, {"name": "Jane", "email": "jane.doe@test.com"}].</pre></div>',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'json'] },
    },
  },
  {
    type: 'checkbox',
    input: true,
    label: 'Lazy Load Data',
    key: 'lazyLoad',
    tooltip: 'When set, this will not fire off the request to the URL until this control is within focus. This can improve performance if you have many Select dropdowns on your form where the API\'s will only fire when the control is activated.',
    weight: 11,
    conditional: {
      json: {
        and: [
          {
            in: [
              { var: 'data.dataSrc' },
              [
                'resource',
                'url',
              ],
            ],
          },
          {
            '!==': [
              { var: 'data.widget' },
              'html5'
            ]
          }
        ]
      },
    },
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Data Source Values',
    key: 'data.values',
    tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
    weight: 10,
    reorder: true,
    defaultValue: [{ label: '', value: '' }],
    components: [
      {
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield',
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        allowCalculateOverride: true,
        calculateValue: 'value = _.camelCase(row.label);',
      },
    ],
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
    },
  },
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form21?type=resource&limit=1000000',
    },
    authenticate: true,
    template: '<span>{{ item.name }}</span>',
    valueProperty: 'id',
    clearOnHide: false,
    label: 'Resource',
    key: 'data.resource',
    lazyLoad: false,
    weight: 10,
    tooltip: 'The resource to be used with this field.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'resource'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    label: 'Select Fields',
    key: 'selectFields',
    tooltip: 'The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.',
    placeholder: 'Comma separated list of fields to select.',
    weight: 14,
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'resource'] },
          { '===': [{ var: 'data.valueProperty' }, ''] },
        ],
      },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'searchField',
    label: 'Search Query Name',
    weight: 16,
    description: 'Name of URL query parameter',
    tooltip: 'The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'searchDebounce',
    label: 'Search request delay',
    weight: 16,
    description: 'The delay (in seconds) before the search request is sent.',
    tooltip: 'The delay in seconds before the search request is sent, measured from the last character input in the search field.',
    validate: {
      min: 0,
      customMessage: '',
      json: '',
      max: 1,
    },
    delimiter: false,
    requireDecimal: false,
    defaultValue: 0.3,
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'minSearch',
    weight: 17,
    label: 'Minimum Search Length',
    tooltip: 'The minimum amount of characters they must type before a search is made.',
    defaultValue: 0,
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'url'] },
          { '!=': [{ var: 'data.searchField' }, ''] },
        ],
      },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'filter',
    label: 'Filter Query',
    weight: 18,
    description: 'The filter query for results.',
    tooltip: 'Use this to provide additional filtering using query parameters.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'sort',
    label: 'Sort Query',
    weight: 18,
    description: 'The sort query for results',
    tooltip: 'Use this to provide additional sorting using query parameters',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'limit',
    label: 'Limit',
    weight: 18,
    description: 'Maximum number of items to view per page of results.',
    tooltip: 'Use this to limit the number of items to request or view.',
    clearOnHide: false,
    conditional: {
      json: {
        and: [
          { in: [
            { var: 'data.dataSrc' },
            [
              'url',
              'resource'
            ],
          ] },
          { '!==': [{ var: 'data.disableLimit' }, true] }
        ]
      },
    },
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh Options On',
    weight: 19,
    tooltip: 'Refresh data when another field changes.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        const values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values',
            'custom'
          ],
        ],
      },
    },
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOnBlur',
    label: 'Refresh Options On Blur',
    weight: 19,
    tooltip: 'Refresh data when another field is blured.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        const values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values'
          ],
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 20,
    key: 'clearOnRefresh',
    label: 'Clear Value On Refresh Options',
    defaultValue: false,
    tooltip: 'When the Refresh On field is changed, clear this components value.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values',
            'custom'
          ],
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 21,
    key: 'searchEnabled',
    label: 'Enable Static Search',
    defaultValue: true,
    tooltip: 'When checked, the select dropdown will allow for searching within the static list of items provided.',
  },
  {
    type: 'checkbox',
    input: true,
    weight: 21,
    key: 'noRefreshOnScroll',
    label: 'Disable Options Refresh When Scrolling',
    defaultValue: false,
    tooltip: 'When checked, the select with search input won\'t perform new api requests when scrolling through the list of options.',
    conditional: {
      json: {
        and: [
          {  in: [
              { var: 'data.dataSrc' },
              [
                'url',
                'resource'
              ],
            ] },
          { '===': [{ var: 'data.searchEnabled' }, true] }
        ]
      },
    },
  },
  {
    label: 'Search Threshold',
    mask: false,
    tableView: true,
    alwaysEnabled: false,
    type: 'number',
    input: true,
    key: 'selectThreshold',
    validate: {
      min: 0,
      customMessage: '',
      json: '',
      max: 1,
    },
    delimiter: false,
    requireDecimal: false,
    defaultValue: 0.3,
    weight: 22,
    tooltip: 'At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.',
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 28,
    input: true,
    key: 'customOptions',
    label: 'Choices.js options',
    tooltip: 'A raw JSON object to use as options for the Select component (Choices JS).',
    defaultValue: {},
  },
  {
    type: 'checkbox',
    input: true,
    weight: 29,
    key: 'useExactSearch',
    label: 'Use exact search',
    tooltip: 'Disables search algorithm threshold.',
  },
  {
    key: 'persistent',
    weight: 30,
    overrideEditForm: true,
    values: [
      { label: 'None', value: false },
      { label: 'Server', value: true },
    ],
  },
  {
    key: 'encrypted',
    ignore: true
  },
  {
    key: 'customDefaultValuePanel',
    ignore: true
  },
  {
    key: 'calculateValuePanel',
    ignore: true
  },
  {
    key: 'calculateServer',
    ignore: true
  },
  {
    key: 'allowCalculateOverride',
    ignore: true
  },
];
