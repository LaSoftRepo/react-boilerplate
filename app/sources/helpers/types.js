
const boolOrType   = type => PropTypes.oneOfType([ PropTypes.bool,   type ]);
const numberOrType = type => PropTypes.oneOfType([ PropTypes.number, type ]);
const stringOrType = type => PropTypes.oneOfType([ PropTypes.string, type ]);
const funcOrType   = type => PropTypes.oneOfType([ PropTypes.func,   type ]);
const nodeOrType   = type => PropTypes.oneOfType([ PropTypes.node,   type ]);

const BoolTypes = {
  bool:         PropTypes.bool,

  boolOrNumber: boolOrType(PropTypes.number),
  boolOrString: boolOrType(PropTypes.string),
  boolOrObject: boolOrType(PropTypes.object),
  boolOrFunc:   boolOrType(PropTypes.func),
  boolOrNode:   boolOrType(PropTypes.node),

  boolOrArrayOf: type => boolOrType(PropTypes.arrayOf(type)),
};

const FuncTypes = {
  func:          PropTypes.func,

  funcOrBool:    BoolTypes.boolOrFunc,
  funcOrNumber:  funcOrType(PropTypes.number),
  funcOrString:  funcOrType(PropTypes.string),
  funcOrObject:  funcOrType(PropTypes.object),
  funcOrNode:    funcOrType(PropTypes.node),

  funcOrArrayOf: type => funcOrType(PropTypes.arrayOf(type)),
};

const NumberTypes = {
  number:         PropTypes.number,

  numberOrBool:   BoolTypes.boolOrNumber,
  numberOrString: numberOrType(PropTypes.string),
  numberOrObject: numberOrType(PropTypes.object),
  numberOrFunc:   FuncTypes.funcOrNumber,
  numberOrNode:   numberOrType(PropTypes.node),

  numberOrArrayOf: type => numberOrType(PropTypes.arrayOf(type)),
};

const StringTypes = {
  string:         PropTypes.string,

  stringOrBool:   BoolTypes.boolOrString,
  stringOrObject: stringOrType(PropTypes.object),
  stringOrNumber: NumberTypes.numberOrString,
  stringOrFunc:   FuncTypes.funcOrString,
  stringOrNode:   stringOrType(PropTypes.node),

  stringOrArrayOf: type => stringOrType(PropTypes.arrayOf(type)),
};

const NodeTypes = {
  node:         PropTypes.node,

  nodeOrBool:   BoolTypes.boolOrNode,
  nodeOrObject: nodeOrType(PropTypes.object),
  nodeOrNumber: NumberTypes.numberOrNode,
  nodeOrFunc:   FuncTypes.funcOrNode,

  nodeOrArrayOf: type => nodeOrType(PropTypes.arrayOf(type)),
};

const Types = {
  ...FuncTypes,
  ...NumberTypes,
  ...StringTypes,
  ...NodeTypes,
};

export default Types;
