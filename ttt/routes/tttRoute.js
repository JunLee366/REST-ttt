var express = require('express');
var router = express.Router()

var tttControler = require('../controllers/tttController.js');

// "/ttt"
router.route("/").get(tttControler.getUser)   

// "/ttt/play"
router.route("/play").post(tttControler.makeMove)

module.exports = router;