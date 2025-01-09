const express = require("express");
const router = express.Router();
const db = require("./db/conn");

// INDEX
router.get("/", (req, res) => {
  res.send("API dei post");
});

router.get("/posts", (req, res) => {
  const query = "SELECT * FROM posts";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errore nel recupero dei post", err);
      res.status(500).json({ error: "Errore del server" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
