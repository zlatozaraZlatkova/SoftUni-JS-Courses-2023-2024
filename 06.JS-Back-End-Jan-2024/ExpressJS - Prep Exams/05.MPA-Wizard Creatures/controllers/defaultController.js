const router = require("express").Router();

router.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
  });
});

module.exports = router;