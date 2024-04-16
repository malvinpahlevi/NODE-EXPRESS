const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const str = __dirname;
const n = str.lastIndexOf('\\');
const prefixFolder = str.substring(n + 1);
const fileUpload = require('express-fileupload');

const app = express();
const router = require("./routes")();
// const { dataAccess } = require("./database/data-access");

dotenv.config({
  path: path.resolve(`${str}`, `${process.env.NODE_ENV}.env`),
});

app.set('view engine', 'ejs');
app.use(fileUpload({
  limits: { fileSize: 0.5 * 1024 * 1024 },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const winstonLogger = require("./utility/winston-logger");

if (process.env.NODE_ENV !== 'production'){
  app.use(winstonLogger());
}

// API
app.get("/", (req, res) => {
  res.send("<b>School-App Online</b>");
});
app.get("/upload", async (req, res, next) => {
  res.render("form-upload")
})
app.use(`/api/v1`, router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `[School-App] Server started running on ${port} for ${process.env.NODE_ENV}`
  );
});
