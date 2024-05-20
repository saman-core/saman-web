export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'key',
    overrideEditForm: true,
    label: 'Property Name',
    tooltip: 'The name of this field in the API endpoint.',
    validate: {
      customMessage: 'The property name must only contain alphanumeric characters, start with a lowercase, have no more than 19 characters or match a reserved Java word.',
      custom: "const k=['abstract','assert','boolean','break','byte','case','catch','char','class','continue','default','do','double','else','enum','extends','final','finally','float','for','if','implements','import','instanceof','int','interface','long','native','new','package','private','protected','public','return','short','static','super','switch','synchronized','this','throw','throws','transient','try','void','volatile','while','exports','module','open','opens','permits','provides','record','requires','sealed','to','transitive','uses','var','when','with','yield','true','false','null','const','goto','strictfp'];\nconst f=k.findIndex(e => e===input);\nconst r=/^[a-z]{1}[a-zA-Z0-9]{0,18}$/;\nvalid=f===-1 && r.test(input);",
      required: true,
    },
  },
];
