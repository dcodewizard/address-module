import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Input from '../components/input/input'
import Card from '../components/card/card'
import Button from '../components/button/button'
import { getAddresses } from '../api/addressAPI';

export default function Home( {} ) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddresses()
      .then((data) => setAddresses(data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

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
        {/* <Card editState={true}>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card>
        <Card>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card> */}

        {addresses.map((address) => (
          <Card key={address.id}>
            <p>{address.line1}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
          </Card>
        ))}
      </div>
    </Layout>
  )
}