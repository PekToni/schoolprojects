const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const UserController = {
    registerUser: (req, res) => {

        // passu cryptataan
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // luodaan käyttäjä tietokantaan
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isuser: req.body.isuser,
            isadmin: req.body.isadmin,
        },

        // funktiossa annetaan error jos joku error ja luodaan token jos rekisteröinti onnistuu
        (err, user) => {

            if (err) return res.status(500).send('There was a problem registering the user.' + err);

            // tehdään payload jossa id ja admin tieto
            const payload = {
                'username': user.username,
                'isuser': user.isuser,
                'isadmin': user.isadmin,
            };
            // luodaan token
            const token = jwt.sign(payload, process.env.secret, {
                expiresIn: 86400,
            });
            // lähetetään vastaus
            res.json({
                success: true,
                message: 'Authentication success',
                token: token,
            });
        });
    },

    authenticateUser: (req, res, next) => {
        User.findOne({ username: req.body.username }, (err) => {
            if (err) {
                res.send(err);
                console.log('error');
            }
        }).then(async (user) => {
            if (!user) {
                res.json({
                    success: false,
                    message: 'Wrong username',
                });
                //res.status(404).send(err);
                //console.log('eh');
            }

            const password = req.body.password;
            const comparePass = await bcrypt.compare(password, user.password);

            // jos tulee false passun vertailusta
            if (!comparePass) {
                res.json({
                    success: false,
                    message: 'Wrong password',
                });
                //res.status(500).send('Incorrect password');
                //return;
            }

            // tehdään payload jossa id ja admin tieto
            const payload = {
                'username': user.username,
                'isuser': user.isuser,
                'isadmin': user.isadmin,
            };
                // luodaan token
            const token = jwt.sign(payload, process.env.secret, {
                expiresIn: 86400,
            });
                // lähetetään vastaus
            res.json({
                success: true,
                message: 'Authentication success',
                token: token,
            });
        }).catch((err) => {
            res.send(err);
        });
    },
    showUsers: (req, res) => {
        User.find().then((users) => {
            console.log(users);
            res.send(users);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users',
            });
        });
    },
    modifyUser: (req, res) => {
        User.findByIdAndUpdate(req.params.userId, {
            isuser: req.body.isuser,
            isadmin: req.body.isadmin,
        }, {new: true}).then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId,
                });
            }
            res.send(user);
        }).catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId,
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.userId,
            });
        });
    },
    deleteUser: (req, res) => {
        User.findByIdAndRemove(req.params.userId).then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId,
                });
            }
            res.send({
                message: 'User succesfully removed ' + req.params.userId,
            });
        }).catch((err) => {
            return res.status(500).send({
                message: 'Error removing user with id ' + req.params.userId,
            });
        });
    },
    addUser: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
                message: 'User content cannot be empty',
            });
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isuser: req.body.isuser,
            isadmin: req.body.isadmin,
        });

        user.save().then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while saving user',
            });
        });
    },
};

module.exports = UserController;