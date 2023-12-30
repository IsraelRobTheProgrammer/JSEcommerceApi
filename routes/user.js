
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hello there");
});

router.post("/postuser", (req, res) => {
  const usname = req.body.usname;
  res.send(usname);
});

module.exports = router;
