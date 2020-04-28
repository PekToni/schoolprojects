const express = require('express');
const router = express.Router();
const message = require('../controllers/MessageController');
const authadmin = require('../verifyadmin');
const auth = require('../verifytoken');

router.get('/', message.showMessages);

router.post('/addmessage', auth, message.addMessage);

router.post('/addmessage/:messageId', auth, message.replyMessage);

router.delete('/:messageId', authadmin, message.deleteMessage);

router.put('/:messageId/:replyId', authadmin, message.deleteReply);

router.put('/:messageId', auth, message.modifyMessage);

router.put('/modifyreply/:messageId/:replyId', auth, message.modifyReply);

module.exports = router;
