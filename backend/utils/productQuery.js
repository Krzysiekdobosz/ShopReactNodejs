const SORT_FIELDS = ['name', 'price', 'createdAt'];

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Builds a MongoDB filter and sort object from the query string of GET /api/products.
const buildProductQuery = ({ search, category, minPrice, maxPrice, sortBy, order } = {}) => {
    const filter = {};

    if (search) {
        const pattern = new RegExp(escapeRegex(String(search).trim()), 'i');
        filter.$or = [{ name: pattern }, { description: pattern }];
    }
    if (category) {
        filter.category = category;
    }

    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (minPrice !== undefined && minPrice !== '' && !Number.isNaN(min)) {
        filter.price = { ...filter.price, $gte: min };
    }
    if (maxPrice !== undefined && maxPrice !== '' && !Number.isNaN(max)) {
        filter.price = { ...filter.price, $lte: max };
    }

    const field = SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';
    const sort = { [field]: order === 'asc' ? 1 : -1 };

    return { filter, sort };
};

module.exports = { buildProductQuery, SORT_FIELDS };
