const router = require("express").Router();
const controller = require("../controllers/feedback");

router.post("/", controller.webFeedback);

router.post("/booking", controller.bookingFeedback);

module.exports = router;
