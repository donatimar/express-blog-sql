const express = require("express");
const app = express();
const postsController = require("./postscontroller");

app.use(express.json());

app.use(postsController);

const port = 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
