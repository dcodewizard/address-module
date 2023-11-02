const addressController = require('./index.js');

async function addAddress(req, res) {
  try {
    const id = await addressController.add(req.body);
    res.json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllAddresses(req, res) {
  try {
    const addresses = await addressController.getAll();
    if (addresses) {
      res.json({ addresses: addresses })
    } else {
      res.status(404).send({ message: "No Addresses Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

async function getAddress(req, res) {
  try {
    const address = await addressController.get(req.params.id);
    if (address) {
      res.json({ address: address });
    } else {
      res.status(404).send({ message: "No Address Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateAddress(req, res) {
  try {
    await addressController.update(req.params.id, req.body);
    res.send({ message: "Successfully Updated the Address" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteAddress(req, res) {
  try {
    await addressController.delete(req.params.id);
    res.send({ message: "Successfully Deleted the Address" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchAddress(req, res) {
  try {
    const searchString = req.query.searchString || '';
    const addresses = await addressController.search(searchString);
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  searchAddress,
  getAllAddresses,
}