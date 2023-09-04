const express = require('express');
const router = express.Router();

const { signup, signin, signout, list, remove, userById } = require('../controllers/authContol');
const authToken = require('../middlewares/authToken');

router.get('/list', authToken, list);
router.post('/signup', authToken, signup);
router.post('/signin', signin);
router.post('/signout', authToken, signout);
router.delete('/:userId', authToken, remove);

router.param('userId', userById);

module.exports = router;