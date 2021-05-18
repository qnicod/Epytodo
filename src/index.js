const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes/api.js');
const middleware = require('./middleware/auth.js');
const error = require('./middleware/notFound');

app.unsubscribe(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(middleware.log);
app.use(middleware.type);
app.use(middleware.time);
app.use(middleware.url);
app.use(middleware.id);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Epytodo application!"});
});

app.use("/", routes);

app.use(error.notFound);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
