const mysql = require("mysql2");

// Configurazione del database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "db-blog",
});

// Connessione al database
db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connessione al database riuscita");
});

module.exports = db;
