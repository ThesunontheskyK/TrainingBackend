const express = require('express');
const router = express.Router();

const userControll = require('../controller/userControoller');

router.get('/',userControll.GetAllUser);

router.get('/:id',userControll.GetUserbyID);

router.post('/register',userControll.RegisterUser);

router.delete('/:id',userControll.DeleteUser);

router.put('/:id',userControll.UpdateUser);

module.exports = router;