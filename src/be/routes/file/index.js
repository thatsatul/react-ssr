var router = require('express').Router();

var fileController = require('../../controllers/file');

router.get('/upload', fileController.uploadFile);

module.exports = router;
