const addressSchema = require( './address.schema.json' );
const validate = require( '../../utils/validate' );
const { serialize, deserialize } = require( '../../utils/message-pack' );
const uuid = require( 'uuid' ).v4;

const redis = require( '../../singletons/redis' );
const ADDRESSES = 'addresses';

// eslint-disable-next-line
const log = console.log;

module.exports = {
  async add( address ) {
    const id = 'addr_' + uuid() + '_' + Date.now();

    log( 'creating', id );

    const withId = {
      ...address,
      id,
    };

    validate( addressSchema, withId );

    await redis.HSET( ADDRESSES, withId.id, serialize( withId ) );

    return id;
  },

  async update( id, newData ) {
    log( 'updating', id );

    validate( addressSchema, newData );

    await redis.HSET( ADDRESSES, id, serialize( newData ) );
  },

  async delete( id ) {
    log( 'deleting', id );

    await redis.HDEL( ADDRESSES, id );
  },

  async get( id ) {
    log( 'getting', id );

    const res = await redis.HGET( ADDRESSES, id );
    if ( !res ) return;
    return deserialize( res );
  },

  async getAll() {
    log('getting all addresses');

    const addresses = await redis.HGETALL(ADDRESSES);

    if (!addresses) return [];

    const addressArray = [];
    for (const key in addresses) {
      if (addresses.hasOwnProperty(key)) {
        const buffer = addresses[key];
        const address = deserialize(buffer);
        const uid = key.substring(key.lastIndexOf('_') + 1); // Extract the UID
        addressArray.push({ uid, address });
      }
    }
    addressArray.sort((a, b) => b.uid.localeCompare(a.uid));
    const sortedAddresses = addressArray.map(item => item.address);

    return sortedAddresses;
  },

  async search( searchString = '' ) {
    log( 'searching', searchString );

    // hint for the interview: Why won't this work in production?

    const addresses = await redis.HGETALL( ADDRESSES );

    if(!addresses) return [];

    return Object.values( addresses )
      .map( ( buffer ) => deserialize( buffer ) )
      // turn the addresses into a flat string
      .filter( ( address ) => {
        const searchable = Object.values( address ).join( ' ' ).toLowerCase();
        return searchable.includes( searchString.toLowerCase() );
      });
  },
};
