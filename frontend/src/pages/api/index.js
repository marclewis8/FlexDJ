const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/user/id", (req, res) => {
  res.status(200).json({ name: "Chazz", email: "chazz@gmail.com" });
});
app.listen(port, () => {
  console.log("Server live");
});
