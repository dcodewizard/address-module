const express = require('express');
const router = express.Router();
const addressRoutes = require('./address.routes')

router.use('/addresses', addressRoutes);

module.exports = router;