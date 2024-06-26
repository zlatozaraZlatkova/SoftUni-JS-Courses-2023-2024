const express = require("express");
const hbs = require("express-handlebars").create({ extname: ".hbs" });
const cookieParser = require("cookie-parser");

const auth = require("../middlewares/auth");
const trimBody = require("../middlewares/trimBody");
const userNav = require("../middlewares/userNav");


module.exports = (app) => {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(express.urlencoded({ extended: false }));

  //img & css
  app.use("/static", express.static("static"));

  //favicon.ico
  app.use("/favicon.ico", express.static("img/favicon.ico"));
  
  app.use(cookieParser());
  app.use(auth());
  app.use(trimBody());
  app.use(userNav());


}