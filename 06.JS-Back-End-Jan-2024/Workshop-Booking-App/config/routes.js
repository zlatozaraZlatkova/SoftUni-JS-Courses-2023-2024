const homeController = require("../controllers/homeController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const defaultController = require("../controllers/defaultController");
const deleteController = require("../controllers/deleteController");
const activityController = require("../controllers/activityController");
const authController = require("../controllers/authController");
const { hasUser } = require("../middlewares/guards");
const editController = require("../controllers/editController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/catalog", catalogController);
  app.use("/create", hasUser(), createController);
  app.use("/delete", deleteController);
  app.use("/activity", activityController);
  app.use("/auth", authController);
  app.use("/edit", editController);

  app.use(defaultController);
};
