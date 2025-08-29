# Battery Store (Node.js + Express + SQLite)

A complete demo e-commerce site for selling batteries.

## Quick Start

```bash
npm install
npm run seed   # creates SQLite DB and sample products
npm start      # http://localhost:3000
```

### Default Ports & Config
- App runs on `PORT=3000` (change via `.env`).
- DB file at `./data/battery.db` (change via `.env`).

## API Summary

- `POST /api/auth/register { name, email, password }`
- `POST /api/auth/login { email, password }` -> `{ token }`
- `GET /api/products` -> list
- `GET /api/products/:id` -> product
- `GET /api/cart` (Bearer) -> cart items
- `POST /api/cart/add` (Bearer) `{ product_id, quantity }`
- `PUT /api/cart/update/:id` (Bearer) `{ quantity }`
- `DELETE /api/cart/remove/:id` (Bearer)
- `POST /api/orders/checkout` (Bearer)
- `POST /api/contact` `{ name, email, message }`

## Project Structure

```
battery-store/
  public/               # frontend (HTML/CSS/JS)
  routes/               # Express route modules
  middleware/           # auth middleware
  scripts/              # DB seed/setup
  server.js             # app entry
  sqlite.js             # DB helper
  package.json
```

## Notes

- Passwords hashed using `bcryptjs`.
- JWT-based auth; token stored in `localStorage` on the client.
- Simple stock decrement on checkout.
- Contact form persists to `Contacts` table.

This is a demo and omits advanced concerns like rate-limiting, CSRF, email verification, etc.
