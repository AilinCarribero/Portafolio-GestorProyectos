const express = require('express');
const router = express.Router();
const { userById } = require ('../controllers/authContol')

const { editar , list , create , remove , proyectoById , listOne } = require('../controllers/proyectoControl');
const authToken = require('../middlewares/authToken');

router.get('/list' , authToken, list);
router.get('/listone/:id' , authToken, listOne);
router.put('/editar/:id' , authToken, editar);
router.post('/create/:userId', authToken, authToken , create);
router.delete('/:proyectoId' , authToken, remove);

router.param('proyectoId' , authToken, proyectoById);
router.param('userId' , authToken, userById);

module.exports = router;