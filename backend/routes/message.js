const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/message', auth, messageCtrl.sendMessage);
router.get('/message', auth, messageCtrl.getMessages);


module.exports = router;