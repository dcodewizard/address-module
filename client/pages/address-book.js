import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import Input from '../components/input/input';
import Card from '../components/card/card';
import { getAddresses, searchAddresses } from '../api/addressAPI';

export default function Home( {} ) {
  const [addresses, setAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAddressList = () => {
    getAddresses()
      .then((data) => setAddresses(data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }

  useEffect(() => {
    getAddressList();
  }, []);

  const toggleEditState = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].editState = !updatedAddresses[index].editState;
    setAddresses(updatedAddresses);
  };

  useEffect(async () => {
    if (searchQuery !== "") {
      try {
        const results = await searchAddresses(searchQuery);
        setAddresses(results);
      } catch (error) {
        console.error('Error searching addresses:', error);
      }
    }
    else getAddressList();
  },[searchQuery])

  return (
    <Layout home>
      <Head>
        <title>Address Book</title>
      </Head>
      <h1 className="mb-8">Address Book</h1>
      <div className="w-full md:w-1/2">
      <Input
        icon="icon-search.svg"
        label="Search Address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter Address to Search..."
      />
      </div>
      <div className="mt-10">
        <Card editState={false} addState={true}>
          <p className="text-lg">Add a new user's address</p>
        </Card>
        {addresses?.map((address, index) => (
          <Card
            editState={address.editState}
            key={address.id}
            address={address}
            onToggleEdit={() => toggleEditState(index)}
            getAllAddresses={getAddressList}
          >
            <p>{address.line1} {address.line2}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}