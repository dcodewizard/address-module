const express = require('express');
const router = express.Router();
const AddressCtrl = require('../controllers/address/address.controller');

router.post('/', AddressCtrl.addAddress);
router.get('/search', AddressCtrl.searchAddress);
router.get('/', AddressCtrl.getAllAddresses);
router.get('/:id', AddressCtrl.getAddress);
router.put('/:id', AddressCtrl.updateAddress);
router.delete('/:id', AddressCtrl.deleteAddress);

module.exports = router;