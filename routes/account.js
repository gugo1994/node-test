const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

router.get('/:id',accountController.show)

router.post('/',accountController.store)

router.put('/:id', accountController.update)

router.delete('/:id', accountController.delete)

module.exports = router;