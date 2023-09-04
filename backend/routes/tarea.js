const express = require('express');
const router = express.Router();
const { userById } = require ('../controllers/authContol')

const { list , create , remove , tareaById , editar, listTarea } = require('../controllers/tareaControl');
const authToken = require('../middlewares/authToken');

router.get('/list/:id' , authToken, list);
router.get('/listone/:id' , authToken, listTarea);
router.put('/editar/:id' , authToken, editar);
router.post('/create/:userId' , authToken, create);
router.delete('/:tareaId' , authToken, remove);

router.param("tareaId" , authToken, tareaById);
router.param('userId' , authToken, userById);

module.exports = router;