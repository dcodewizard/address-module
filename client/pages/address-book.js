import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import Input from '../components/input/input';
import Card from '../components/card/card';
import Button from '../components/button/button';
import { getAddresses } from '../api/addressAPI';

export default function Home( {} ) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddresses()
      .then((data) => setAddresses(data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  // Callback to toggle the edit state for a specific address
  const toggleEditState = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].editState = !updatedAddresses[index].editState;
    setAddresses(updatedAddresses);
  };

  return (
    <Layout home>
      <Head>
        <title>Address Book</title>
      </Head>
      <h1 className="mb-8">Address Book</h1>
      <div className="w-full md:w-1/2">
        <Input
          icon="icon-search.svg"
          label="HELLO"
        ></Input>
      </div>
      <div className="mt-10">
        <Card editState={false} addState={true}>
          <p className="text-lg">Add a new user's address</p>
        </Card>
        {addresses.map((address, index) => (
          <Card
            editState={address.editState}
            key={address.id}
            onToggleEdit={() => toggleEditState(index)}
          >
            <p>{address.line1} {address.line2}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}