const express = require('express');
const router = express.Router();

const asyncHandler = require("#src/middlewares/async");
const errorHandler = require("#src/middlewares/error");

// router.use(apiCache('10 minutes'));



module.exports = router;
