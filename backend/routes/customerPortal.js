const express = require('express');
const router = express.Router();
const { getPublicOrderStatus } = require('../controllers/customerPortalController');

router.get('/track-order', getPublicOrderStatus);

module.exports = router;
