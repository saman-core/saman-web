export default [
  {
    key: 'dataSrc',
    overrideEditForm: true,  
    data: {
      values: [
        { label: 'Values', value: 'values' },
        { label: 'Resource', value: 'resource' },
        { label: 'Raw JSON', value: 'json' },
      ],
    },
  },
  {
    key: 'data.resource',
    overrideEditForm: true,  
    data: {
      url: '/form21?type=resource&limit=1000000&select=_id,title',
    },
  },
  {
    key: 'valueProperty',
    overrideEditForm: true,   
    data: {
      url: '/form66/{{ data.data.resource }}',
    },
    
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
    overrideEditForm: true,
    logic: [],
  },
  {
    key: 'dataType',
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
