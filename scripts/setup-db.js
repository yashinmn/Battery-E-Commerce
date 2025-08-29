import fs from 'fs';
import path from 'path';
import { db } from '../sqlite.js';

const reset = process.argv.includes('--reset');
const sqlFile = path.join(process.cwd(), 'scripts', 'seed.sql');
const sql = fs.readFileSync(sqlFile, 'utf-8');

db.serialize(() => {
  if (reset) {
    console.log('Resetting database file...');
  }
  db.exec(sql, (err) => {
    if (err) {
      console.error('DB setup failed:', err);
      process.exit(1);
    } else {
      console.log('Database setup complete.');
      process.exit(0);
    }
  });
});
