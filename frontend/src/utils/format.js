const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const formatPrice = (value) => priceFormat.format(value);
