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
    label: 'Arbitrary-precision arithmetic',
    tooltip: 'Arbitrary-Precision arithmetic is a set of data structures and algorithms which allows to process much greater numbers than can be fit in standard data types.',
    key: 'arbitraryPrecision',
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
