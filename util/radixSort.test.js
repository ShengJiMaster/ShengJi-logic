const { radixSort, countSort, getDigit, countDigits } = require('./radixSort');
const _ = require('lodash');
const isSorted = require('util/isSorted');

describe('radixSort', () => {
	describe('countDigits', () => {
		it('should handle zero', (done) => {
			expect(countDigits(0)).toEqual(1);
			done();
		});

		it('should count len 1-10', (done) => {
			for (let i = 1; i < 10; i++) {
				const exp = Math.pow(10, i);
				expect(countDigits(exp)).toEqual(i + 1);
			}
			done();
		});
	});

	describe('getDigit', () => {
		it('should get non-zero digits', (done) => {
			let num = 987654321;
			for (let i = 0; i < 10; i++) {
				const d = getDigit(num, i);
				expect(d).toEqual(i);
			}
			done();
		});

		it('should get zero digits', (done) => {
			let num = 1000000;
			for (let i = 0; i < 5; i++) {
				expect(getDigit(num, i)).toEqual(0);
			}
			done();
		});

		it('should handle exp > num', (done) => {
			for (let i = 2; i < 5; i++) {
				expect(getDigit(i, i)).toEqual(0);
			}
			done();
		});
	});

	describe('countSort', () => {
		it('should sort 0-9', (done) => {
			const nums = _.shuffle(_.range(10));
			const sort = countSort(nums, 1);
			expect(isSorted(sort)).toBe(true);
			done();
		});

		it('should sort non-ones digit', (done) => {
			const nums = _.shuffle(_.range(0, 100, 10));
			const sort = countSort(nums, 2);
			expect(isSorted(sort)).toBe(true);
			done();
		});
	});

	describe('main', () => {
		it('should sort nums 1-100', (done) => {
			const nums = _.shuffle(_.range(100));
			const sort = radixSort(nums);
			expect(isSorted(sort)).toBe(true);
			done();
		});

		it('should custom parse items', (done) => {
			const nums = _.shuffle(_.range(50)).map((id) => ({ id }));
			const sort = radixSort(nums, (num) => num.id);
			const sortParse = sort.map((x) => x.id);
			expect(isSorted(sortParse)).toBe(true);
			done();
		});
	});
});
