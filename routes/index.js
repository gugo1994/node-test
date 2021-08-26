const express = require('express');
const router = express.Router();

const Account = new require('../model/account')

// const use = await Account.findOne({ where: { email: 'hovos@mail.ru' } });
// use.update({
//     password: 'sdsdfgdfgdd'
// })
  router.post('/account', async (req, res) => {

    const {username,email,password} = req.body

    const accountModel =  Account.create({
        username,
        email,
        password
      });
      return  res.status(200).send({ })
  })
module.exports = router;