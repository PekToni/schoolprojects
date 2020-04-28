const jwt = require('jsonwebtoken');
const config = require('./config');
const secret = config.secret;

function verifyAdmin (req, res, next) {
    // token otetaan joko bodysta tai headerista
    const token = req.body.token || req.headers['x-access-token'];

    // jos tokenia ei ole, niin välitetään siitä ilmoitus
    if (!token) return res.status(401).send({ auth: false, message: 'Didnt deliver token' });

    // jos token toimitetaan, niin tarkistetaan onko se oikea ja onko käyttäjä admin
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                const err = new Error('You havent been authenticated');
                err.status = 401;
                return next(err);
            } else {
                // testataan onko admin
                if (decoded.isadmin) {
                    req.decoded = decoded;
                    next();
                }
            }
        });
    }
};

module.exports = verifyAdmin;