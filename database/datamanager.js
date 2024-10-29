const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
});

module.exports = {
  addUser: (user, callback) => {
    const stmt = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
    stmt.run([user.name, user.email], function (err) {
      callback(err, this.lastID);
    });
    stmt.finalize();
  },
  getUsers: (callback) => {
    db.all(`SELECT * FROM users`, (err, rows) => {
      callback(err, rows);
    });
  }
};
