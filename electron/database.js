const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../data/ranking.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS faculties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            faculty_id INTEGER,
            FOREIGN KEY (faculty_id) REFERENCES faculties (id)
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            game_id INTEGER,
            score INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (game_id) REFERENCES games (id)
        )
    `);

  const faculties = [
    { id: 1, name: "Sistemas" },
    { id: 2, name: "Ing. de Sistemas Computacionales" },
    { id: 3, name: "Ing. Eléctrica" },
    { id: 4, name: "Ing. Industrial" },
    { id: 5, name: "Ing. Civil" },
    { id: 6, name: "Ing. Mecánica" },
  ];

  faculties.forEach((f) => {
    db.run(`INSERT OR IGNORE INTO faculties (id, name) VALUES (?, ?)`, [
      f.id,
      f.name,
    ]);
  });

  // hay que agregar los juegos de las demas facultades xD
  const games = [
    { id: 1, name: "Debug or Die", faculty_id: 1 },
    { id: 2, name: "SQL Knowledge", faculty_id: 1 },
    { id: 3, name: "Cyberguard", faculty_id: 1 },
    { id: 4, name: "Quien Quiere ser Senior", faculty_id: 1 },
  ];
  games.forEach((g) => {
    db.run(
      `INSERT OR IGNORE INTO games (id, name, faculty_id) VALUES (?, ?, ?)`,
      [g.id, g.name, g.faculty_id],
    );
  });
});

module.exports = db;
