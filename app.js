const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const sequelize = require("./utils/sequelize");
const client = require("./router/client.router");
const admin = require("./router/admin.router");

const accesslogsystem = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);

app.use(bodyParser.json());
app.use(morgan("combined", { stream: accesslogsystem }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCG,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type",
    "Authorization"
  );
  next();
});
app.use("/admin", admin);
app.use(client);
app.use((err,req,res,next)=>{
  console.log(err);
  return res.status(req.status).send(err.massage||err )
})
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((e) => {
    console.log(e);
  });
