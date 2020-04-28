const express = require('express');
const router = express.Router();
const userCont = require('../controllers/UserController');

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
*/

router.post('/register', userCont.registerUser);

router.post('/login', userCont.authenticateUser);

router.get('/', userCont.showUsers);

router.put('/:userId', userCont.modifyUser);

router.delete('/:userId', userCont.deleteUser);

router.post('/newuser', userCont.addUser);

module.exports = router;
