import axios from 'axios';

const baseURL = 'http://localhost:3001'

export const getAddresses = async () => {
  try {
    const response = await axios.get(`${baseURL}/addresses`);
    return response.data.addresses;
  } catch (error) {
    throw error;
  }
};

export const addAddress = async (addressData) => {
  try {
    const response = await axios.post('/addresses', addressData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (id, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/addresses/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    await axios.delete(`${baseURL}/addresses/${id}`);
  } catch (error) {
    throw error;
  }
};

export const searchAddresses = async (searchString) => {
  try {
    const response = await axios.get(`${baseURL}/addresses/search?searchString=${searchString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAddressById = async (id) => {
  try {
    const response = await axios.get(`/addresses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
