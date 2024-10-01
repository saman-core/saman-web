export default [
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
    weight: 31,
    type: 'checkbox',
    label: 'Long number',
    tooltip: 'Change the default Integer data type to Long',
    key: 'longNumber',
    input: true
  },
  {
    key: 'encrypted',
    overrideEditForm: true,
    logic: [],
  },
  {
    key: 'multiple',
    ignore: true
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
