import { mockApi, resetDemo } from './mock';
import { setToken } from './token';

const loginAs = async (email, password) => {
    const { token } = await mockApi.login({ email, password });
    setToken(token);
};

beforeEach(() => {
    localStorage.clear();
    resetDemo();
    setToken(null);
});

test('filters and sorts products like the API', async () => {
    const road = await mockApi.getProducts({ category: 'Road', sortBy: 'price', order: 'asc' });
    expect(road.map((p) => p.price)).toEqual([...road.map((p) => p.price)].sort((a, b) => a - b));
    expect(road.every((p) => p.category === 'Road')).toBe(true);

    const cheap = await mockApi.getProducts({ maxPrice: 50 });
    expect(cheap.every((p) => p.price <= 50)).toBe(true);
});

test('requires login for the cart', async () => {
    await expect(mockApi.getCart()).rejects.toThrow('authorization denied');
});

test('adds, updates and removes cart items', async () => {
    await loginAs('user@example.com', 'user123');
    let cart = await mockApi.addToCart('p1', 2);
    expect(cart.products.find((i) => i.product._id === 'p1').quantity).toBe(2);

    cart = await mockApi.updateCartItem('p1', 5);
    expect(cart.products.find((i) => i.product._id === 'p1').quantity).toBe(5);

    await expect(mockApi.updateCartItem('p1', 0)).rejects.toThrow('Quantity');

    cart = await mockApi.removeFromCart('p1');
    expect(cart.products.some((i) => i.product._id === 'p1')).toBe(false);
});

test('only admins can delete products and deletion cleans up carts', async () => {
    await loginAs('user@example.com', 'user123');
    await mockApi.addToCart('p3', 1);
    await expect(mockApi.deleteProduct('p3')).rejects.toThrow('Access denied');

    await loginAs('admin@example.com', 'admin123');
    await mockApi.deleteProduct('p3');

    await loginAs('user@example.com', 'user123');
    const cart = await mockApi.getCart();
    expect(cart.products.some((i) => i.product._id === 'p3')).toBe(false);
});
