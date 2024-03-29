const express = require("express");
const hbs = require("express-handlebars").create({ extname: ".hbs" });
const cookieParser = require("cookie-parser");
const defaultTitle = require("../middlewares/defaultTitle");
const auth = require("../middlewares/auth");
const userNavBar = require("../middlewares/userNavBar");

//production environment: set defaults in .env 
//const jwtSecret = process.env.JWT_SECRET

const jwtSecret = "s)h0h*ads12717!ewhawh$";


module.exports = (app) => {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(express.urlencoded({ extended: false }));
  app.use("/static", express.static("static"));
  app.use(cookieParser());
  app.use(auth(jwtSecret));
  app.use(userNavBar());

  app.use(defaultTitle("Chalets & Huts"));
};
 