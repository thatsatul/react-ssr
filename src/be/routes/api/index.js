var router = require('express').Router();

// split up route handling
router.use('/file', require('../file'));

module.exports = router;
