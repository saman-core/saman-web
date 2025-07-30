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
    key: 'encrypted',
    overrideEditForm: true,
    logic: [],
  },
  {
    key: 'dataType',
    ignore: true,
  },
  {
    key: 'customDefaultValuePanel',
    ignore: true,
  },
  {
    key: 'calculateValuePanel',
    ignore: true,
  },
  {
    key: 'calculateServer',
    ignore: true,
  },
  {
    key: 'allowCalculateOverride',
    ignore: true,
  },
];
