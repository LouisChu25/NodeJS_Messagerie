const Message = require('../models/Message');

exports.sendMessage = (req, res, next) => {
    const message = new Message({
      ...req.body
    });
    message.save()
      .then(() => res.status(201).json({message}))
      .catch(error => res.status(400).json({ error }));
};

exports.getMessages = (req, res, next) => {
    Message.find()
        .then(messages => res.status(200).json(messages))
        .catch(err => res.status(400).json({ err }))
};