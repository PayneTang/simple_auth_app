const express = require("express");
const mysql = require("mysql");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "react_protected_route_practice"
});
global.connection = connection;

// App use configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(routes);

app.listen(5000, () => {
  console.log("Listening to port 5000 ...");
});
