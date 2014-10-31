var assign = require('object-assign');

function merge(one, two) {
  return assign({}, one, two);
}

module.exports = merge;
