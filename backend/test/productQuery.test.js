const test = require('node:test');
const assert = require('node:assert');
const { buildProductQuery } = require('../utils/productQuery');

test('returns an empty filter and newest-first sort by default', () => {
    assert.deepStrictEqual(buildProductQuery(), { filter: {}, sort: { createdAt: -1 } });
});

test('filters by category and price range', () => {
    const { filter } = buildProductQuery({ category: 'Road', minPrice: '100', maxPrice: '2000' });
    assert.deepStrictEqual(filter, { category: 'Road', price: { $gte: 100, $lte: 2000 } });
});

test('ignores empty and invalid price values', () => {
    const { filter } = buildProductQuery({ minPrice: '', maxPrice: 'abc' });
    assert.deepStrictEqual(filter, {});
});

test('searches name and description case-insensitively and escapes regex characters', () => {
    const { filter } = buildProductQuery({ search: 'u-lock (steel)' });
    assert.ok(filter.$or[0].name.test('Steel U-LOCK (STEEL)'));
    assert.ok(!filter.$or[0].name.test('u-lock steel'));
});

test('sorts only by whitelisted fields', () => {
    assert.deepStrictEqual(buildProductQuery({ sortBy: 'price', order: 'asc' }).sort, { price: 1 });
    assert.deepStrictEqual(buildProductQuery({ sortBy: 'password' }).sort, { createdAt: -1 });
});
