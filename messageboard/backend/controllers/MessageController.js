const Message = require('../models/Message');
const Reply = require('../models/Reply');
const User = require('../models/User');

const MessageController = {
    addMessage: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: 'Message content cannot be empty',
            });
        }

        const message = new Message({
            user: req.body.user,
            title: req.body.title,
            message: req.body.message,
            reply: req.body.reply,
        });

        message.save().then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while saving message',
            });
        });
    },
    deleteMessage: (req, res) => {
        Message.findByIdAndRemove(req.params.messageId).then((message) => {
            if (!message) {
                return res.status(404).send({
                    message: 'Message not found with id ' + req.params.messageId,
                });
            }
            res.send({
                message: 'Message succesfully removed ' + req.params.messageId,
            });
        }).catch((err) => {
            return res.status(500).send({
                message: 'Error removing message with id ' + req.params.messageId,
            });
        });
    },
    deleteReply: (req, res) => {
        Message.findByIdAndUpdate(req.params.messageId, {$pull: {'reply': {'_id': req.params.replyId}}}).then((reply) => {
            if (!reply) {
                return req.status(404).send({
                    message: 'Reply not found with id ' + req.params.replyId,
                });
            }
            res.send({
                message: 'Reply succesfully removed ' + req.params.replyId,
            });
        }).catch((err) => {
            return res.status(500).send({
                message: 'Error removing reply with id ' + req.params.replyId,
            });
        });
    },
    showMessages: (req, res) => {
        Message.find().then((messages) => {
            res.send(messages);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving messages',
            });
        });
    },
    replyMessage: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: 'Reply content cannot be empty',
            });
        }
        Message.findByIdAndUpdate(req.params.messageId, {
            $push: {reply: req.body },
        })
            .then((message) => {
                console.log(message);
                if (!message) {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                res.send(message);
            }).catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                return res.status(500).send({
                    message: 'Error adding reply to message with id ' + req.params.messageId,
                });
            });
    },
    modifyMessage: (req, res) => {
        User.findOne({ username: req.body.username }, (err) => {
            if (err) {
                res.send(err);
                console.log('error');
            }
        }).then((user) => {
            if (!user) {
                res.send('Please log in');
            }
            Message.findByIdAndUpdate(req.params.messageId, {
                title: req.body.title,
                message: req.body.message,
            }, {new: true}).then((message) => {
                if (!message) {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                res.send(message);
            }).catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                return res.status(500).send({
                    message: 'Error updating message with id ' + req.params.messageId,
                });
            });
        }).catch((err) => {
            res.send(err);
        });
    },

    modifyReply: (req, res) => {
        User.findOne({ user: req.body.username }, (err) => {
            if (err) {
                res.send(err);
                console.log('error');
            }
        }).then((user) => {
            if (!user) {
                res.send('Please log in');
            }
            if (!req.body) {
                return res.status(400).send({
                    message: 'Reply content cannot be empty',
                });
            }
            Message.findById(req.params.messageId).then((message) => {
                if (!message) {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                const reply = message.reply.id(req.params.replyId);
                reply.title = req.body.title;
                reply.message = req.body.message;
                console.log(message);
                return message.save();
            }).then((message) => {
                res.send(message);
            }).catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'Message not found with id ' + req.params.messageId,
                    });
                }
                return res.status(500).send({
                    message: 'Error adding reply to message with id ' + req.params.messageId,
                });
            });
        }).catch((err) => {
            console.log('tassa');
            res.send(err);
        });
    },
};

module.exports = MessageController;