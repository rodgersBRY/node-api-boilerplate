const router = require("express").Router();
const controller = require("../controllers/feedback");

router.post("/", controller.feedback);

module.exports = router;
