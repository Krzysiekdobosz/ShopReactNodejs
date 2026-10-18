# Mini Bike Shop

Online store for bikes and cycling accessories built with React, Redux, Node.js, Express and MongoDB. Customers browse and filter the catalogue, save products for later and manage their cart; administrators manage the products.

**Live demo:** https://krzysiekdobosz.github.io/ShopReactNodejs/

The demo runs entirely in the browser with test data, so no server is needed. Test accounts:

| Role     | Email               | Password   |
| -------- | ------------------- | ---------- |
| Customer | `user@example.com`  | `user123`  |
| Admin    | `admin@example.com` | `admin123` |

## Features

### Customers
- Registration and login (JWT), session restored after a page reload
- Product catalogue with search, category filter, price range and sorting (kept in the URL)
- Product page with stock information and quantity picker
- Cart with quantity changes, order summary and free-delivery threshold
- "Saved for later" list

### Administrators
- Add, edit and delete products
- Inventory overview (number of products, items in stock, inventory value)

## Tech stack

- **Frontend:** React 18, Redux + Redux Thunk, React Router, React Bootstrap, Axios, React Toastify
- **Backend:** Node.js, Express, Mongoose, JSON Web Tokens, bcrypt
- **Database:** MongoDB

## Running locally

Requirements: Node.js 18+ and MongoDB.

```bash
# backend
cd backend
cp .env.example .env
npm install
npm run seed     # 15 sample products and the two test accounts
npm run dev      # http://localhost:5000

# frontend (second terminal)
cd frontend
npm install
npm start        # http://localhost:3000, API requests are proxied to :5000
```

`npm run build:demo` in `frontend` builds the standalone demo version and `npm run deploy:demo` publishes it to the `gh-pages` branch.

## API

| Method | Endpoint                     | Access | Description                                   |
| ------ | ---------------------------- | ------ | --------------------------------------------- |
| POST   | `/api/auth/register`         | public | Create an account                             |
| POST   | `/api/auth/login`            | public | Log in                                        |
| GET    | `/api/auth/me`               | user   | Current user                                  |
| GET    | `/api/products`              | public | List (`search`, `category`, `minPrice`, `maxPrice`, `sortBy`, `order`) |
| GET    | `/api/products/categories`   | public | Available categories                          |
| GET    | `/api/products/:id`          | public | Product details                               |
| POST   | `/api/products`              | admin  | Create a product                              |
| PUT    | `/api/products/:id`          | admin  | Update a product                              |
| DELETE | `/api/products/:id`          | admin  | Delete a product                              |
| GET    | `/api/cart`                  | user   | Cart contents                                 |
| POST   | `/api/cart`                  | user   | Add a product (`productId`, `quantity`)       |
| PUT    | `/api/cart/:productId`       | user   | Change quantity                               |
| DELETE | `/api/cart/:productId`       | user   | Remove a product                              |
| DELETE | `/api/cart`                  | user   | Empty the cart                                |
| GET    | `/api/saved`                 | user   | Saved products                                |
| POST   | `/api/saved`                 | user   | Save a product                                |
| DELETE | `/api/saved/:productId`      | user   | Remove from saved                             |

## Tests

```bash
cd backend && npm test
cd frontend && npm test
```
