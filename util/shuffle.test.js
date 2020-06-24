const shuffle = require('./shuffle');
const _ = require('lodash');

describe('shuffle', () => {
  it('should return different array', (done) => {
    const nums = _.range(10);
    shuffle(nums);
    expect(_.range(10)).not.toEqual(nums);
    done();
  });
});
