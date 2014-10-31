var assert = require('assert');
var merge = require('../../utils/merge');

describe('merge', function() {

  it('merges source props', function() {
    var result = merge({a: 'michael', b: 'rackt'}, {a: 'ryan'});
    assert(result.a == 'ryan');
    assert(result.b == 'rackt');
  });

});
