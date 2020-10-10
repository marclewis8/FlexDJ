const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("<p>Foo</p>");
});
app.listen(port, () => {
  console.log("Server live");
});
