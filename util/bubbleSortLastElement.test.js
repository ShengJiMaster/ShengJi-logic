const bubbleSortLastElement = require('./bubbleSortLastElement');
const isSorted = require('./isSorted');
const _ = require('lodash');

describe('bubbleSortLastElement', () => {
  const arr = _.range(5);
  arr.push(-5);
  bubbleSortLastElement(arr);

  it('should sort last element', (done) => {
    const checkSort = () => isSorted(arr);
    expect(checkSort).not.toThrow(Error);
    done();
  });
});
