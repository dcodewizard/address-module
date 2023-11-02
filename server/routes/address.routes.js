const express = require('express');
const asyncHandler = require('express-async-handler')
const router = express.Router();
const AddressCtrl = require('../controllers/address/address.controller');
const addressSchema = require('../controllers/address/address.schema.json');
const createValidator = require('../utils/validate');
const validateAddress = createValidator(addressSchema);

router.post('/', validateAddress, asyncHandler(AddressCtrl.addAddress));
router.get('/search', asyncHandler(AddressCtrl.searchAddress));
router.get('/', asyncHandler(AddressCtrl.getAllAddresses));
router.get('/:id', asyncHandler(AddressCtrl.getAddress));
router.put('/:id', validateAddress, asyncHandler(AddressCtrl.updateAddress));
router.delete('/:id', asyncHandler(AddressCtrl.deleteAddress));

module.exports = router;