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

// DELETE
router.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM posts WHERE id = ?";

  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Errore nell'eliminazione del post", err);
      res.status(500).json({ error: "Errore del server" });
      return;
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }

    res.status(204).send();
  });
});

// SHOW
router.get("/posts/:id", (req, res) => {
  const postId = req.params.id;

  // Query per recupero di post e tag
  const query = `
    SELECT posts.id, posts.title, posts.content, posts.image, tags.label AS tag
    FROM posts
    INNER JOIN post_tag 
    ON posts.id = post_tag.post_id
    INNER JOIN tags 
    ON post_tag.tag_id = tags.id
    WHERE posts.id = ?
  `;

  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Errore nel recupero del post con i tag", err);
      res.status(500).json({ error: "Errore del server" });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }

    // Raggruppamento dei tag
    const post = results[0];
    post.tags = results.map((row) => row.tag);

    res.json(post);
  });
});

module.exports = router;
