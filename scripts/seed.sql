PRAGMA foreign_keys = ON;

-- Tables
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL,
  date TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(product_id) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(product_id) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Sample products (batteries)
DELETE FROM Products;
INSERT INTO Products (name, description, price, stock, category, image) VALUES
('VoltMax Car Battery 45Ah', 'Maintenance-free lead-acid battery, 12V 45Ah. Suitable for compact cars.', 69.99, 25, 'Automotive', 'images/voltmax-45ah.jpg'),
('VoltMax Car Battery 60Ah', 'Reliable starting power, 12V 60Ah. For sedans and SUVs.', 89.99, 30, 'Automotive', 'images/voltmax-60ah.jpg'),
('PowerCell Bike Battery 9Ah', 'High cranking power for motorcycles, 12V 9Ah.', 39.99, 40, 'Two-Wheeler', 'images/powercell-9ah.jpg'),
('EcoLite Inverter Battery 150Ah', 'Tubular battery for home inverters, long backup.', 159.00, 15, 'Inverter', 'images/ecolite-150ah.jpg'),
('EcoLite Inverter Battery 220Ah', 'High capacity tubular battery for heavy usage.', 219.00, 10, 'Inverter', 'images/ecolite-220ah.jpg'),
('ProSolar Battery 100Ah', 'Solar deep-cycle battery, 12V 100Ah for off-grid systems.', 199.00, 12, 'Solar', 'images/prosolar-100ah.jpg');

-- Optional: demo user (password: password123 hashed equivalent will be created via API during registration)
