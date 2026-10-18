// In-browser version of the REST API used by the GitHub Pages demo.
// Every visitor gets their own copy of the data in localStorage.
import catalog from './catalog.json';
import { getToken } from './token';

const DB_KEY = 'shop:demo-db';
const LATENCY_MS = 120;
const MAX_QUANTITY = 99;
const CATEGORIES = ['Mountain', 'Road', 'City', 'Kids', 'Accessories'];

export const DEMO_ACCOUNTS = [
    { email: 'user@example.com', password: 'user123', label: 'Customer' },
    { email: 'admin@example.com', password: 'admin123', label: 'Admin' },
];

const createSeed = () => {
    const now = Date.now();
    return {
        users: [
            { _id: 'u1', name: 'Jan Kowalski', email: 'user@example.com', password: 'user123', role: 'user', saved: ['p2', 'p12'] },
            { _id: 'u2', name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin', saved: [] },
        ],
        products: catalog.map((product, index) => ({
            _id: `p${index + 1}`,
            image: '',
            ...product,
            createdAt: new Date(now - index * 86400000).toISOString(),
        })),
        carts: { u1: [{ product: 'p13', quantity: 1 }] },
    };
};

const load = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(DB_KEY));
        if (saved?.products) return saved;
    } catch {
        // Fall back to fresh data.
    }
    return createSeed();
};

let db = load();

const save = () => {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch {
        // The demo keeps working in memory.
    }
};

export const resetDemo = () => {
    db = createSeed();
    save();
};

const respond = (fn) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(JSON.parse(JSON.stringify(fn())));
            } catch (error) {
                reject(error);
            }
        }, LATENCY_MS);
    });

const newId = () => Math.random().toString(36).slice(2, 10);
const publicUser = ({ _id, name, email, role }) => ({ id: _id, name, email, role });

const currentUser = () => {
    const token = getToken();
    const user = token?.startsWith('demo:') && db.users.find((u) => u._id === token.slice(5));
    if (!user) throw new Error('No token, authorization denied');
    return user;
};

const requireAdmin = () => {
    const user = currentUser();
    if (user.role !== 'admin') throw new Error('Admin resource. Access denied.');
    return user;
};

const findProduct = (id) => {
    const product = db.products.find((p) => p._id === id);
    if (!product) throw new Error('Product not found');
    return product;
};

const parseQuantity = (value) => {
    const quantity = Number(value);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        throw new Error(`Quantity must be a whole number between 1 and ${MAX_QUANTITY}`);
    }
    return quantity;
};

const cartOf = (user) => {
    db.carts[user._id] = db.carts[user._id] || [];
    return db.carts[user._id];
};

const cartResponse = (user) => ({
    products: cartOf(user)
        .map((item) => ({ product: db.products.find((p) => p._id === item.product), quantity: item.quantity }))
        .filter((item) => item.product),
});

const savedResponse = (user) => user.saved.map((id) => db.products.find((p) => p._id === id)).filter(Boolean);

const sanitizeProduct = (data) => {
    const product = {
        name: String(data.name || '').trim(),
        description: String(data.description || '').trim(),
        price: Number(data.price),
        category: data.category,
        image: String(data.image || '').trim(),
        stock: data.stock === undefined || data.stock === '' ? 10 : Number(data.stock),
    };
    if (!product.name || !product.description) throw new Error('Name and description are required');
    if (!(product.price >= 0)) throw new Error('Price must be a positive number');
    if (!CATEGORIES.includes(product.category)) throw new Error('Choose a valid category');
    return product;
};

export const mockApi = {
    login: ({ email, password }) =>
        respond(() => {
            const user = db.users.find((u) => u.email === String(email).toLowerCase() && u.password === password);
            if (!user) throw new Error('Invalid credentials');
            return { token: `demo:${user._id}`, user: publicUser(user) };
        }),

    register: ({ name, email, password }) =>
        respond(() => {
            if (!name || !email || !password) throw new Error('Name, email and password are required');
            if (password.length < 6) throw new Error('Password must be at least 6 characters long');
            if (db.users.some((u) => u.email === email.toLowerCase())) throw new Error('This email is already registered');
            const user = { _id: newId(), name, email: email.toLowerCase(), password, role: 'user', saved: [] };
            db.users.push(user);
            save();
            return { token: `demo:${user._id}`, user: publicUser(user) };
        }),

    me: () => respond(() => publicUser(currentUser())),

    getProducts: ({ search, category, minPrice, maxPrice, sortBy = 'createdAt', order = 'desc' } = {}) =>
        respond(() => {
            const term = String(search || '').trim().toLowerCase();
            const direction = order === 'asc' ? 1 : -1;
            return db.products
                .filter((p) => !term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
                .filter((p) => !category || p.category === category)
                .filter((p) => minPrice === undefined || minPrice === '' || p.price >= Number(minPrice))
                .filter((p) => maxPrice === undefined || maxPrice === '' || p.price <= Number(maxPrice))
                .sort((a, b) => {
                    const field = ['name', 'price', 'createdAt'].includes(sortBy) ? sortBy : 'createdAt';
                    return (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0) * direction;
                });
        }),

    getCategories: () => respond(() => CATEGORIES),
    getProduct: (id) => respond(() => findProduct(id)),

    createProduct: (data) =>
        respond(() => {
            requireAdmin();
            const product = { _id: newId(), ...sanitizeProduct(data), createdAt: new Date().toISOString() };
            db.products.unshift(product);
            save();
            return product;
        }),

    updateProduct: (id, data) =>
        respond(() => {
            requireAdmin();
            const product = findProduct(id);
            Object.assign(product, sanitizeProduct(data));
            save();
            return product;
        }),

    deleteProduct: (id) =>
        respond(() => {
            requireAdmin();
            findProduct(id);
            db.products = db.products.filter((p) => p._id !== id);
            Object.keys(db.carts).forEach((userId) => {
                db.carts[userId] = db.carts[userId].filter((item) => item.product !== id);
            });
            db.users.forEach((user) => {
                user.saved = user.saved.filter((productId) => productId !== id);
            });
            save();
            return { msg: 'Product removed', id };
        }),

    getCart: () => respond(() => cartResponse(currentUser())),

    addToCart: (productId, quantity = 1) =>
        respond(() => {
            const user = currentUser();
            findProduct(productId);
            const amount = parseQuantity(quantity);
            const cart = cartOf(user);
            const item = cart.find((i) => i.product === productId);
            if (item) item.quantity = Math.min(item.quantity + amount, MAX_QUANTITY);
            else cart.push({ product: productId, quantity: amount });
            save();
            return cartResponse(user);
        }),

    updateCartItem: (productId, quantity) =>
        respond(() => {
            const user = currentUser();
            const item = cartOf(user).find((i) => i.product === productId);
            if (!item) throw new Error('Product is not in the cart');
            item.quantity = parseQuantity(quantity);
            save();
            return cartResponse(user);
        }),

    removeFromCart: (productId) =>
        respond(() => {
            const user = currentUser();
            db.carts[user._id] = cartOf(user).filter((i) => i.product !== productId);
            save();
            return cartResponse(user);
        }),

    clearCart: () =>
        respond(() => {
            const user = currentUser();
            db.carts[user._id] = [];
            save();
            return cartResponse(user);
        }),

    getSaved: () => respond(() => savedResponse(currentUser())),

    addToSaved: (productId) =>
        respond(() => {
            const user = currentUser();
            findProduct(productId);
            if (!user.saved.includes(productId)) user.saved.push(productId);
            save();
            return savedResponse(user);
        }),

    removeFromSaved: (productId) =>
        respond(() => {
            const user = currentUser();
            user.saved = user.saved.filter((id) => id !== productId);
            save();
            return savedResponse(user);
        }),
};
