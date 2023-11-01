const express = require( 'express' );
const cors = require('cors');

const bodyParser = require('body-parser');
const apiRoutes = require('./routes')

const app = express();

app.use(cors());
app.use(bodyParser.json({extendedUrl: true}))

app.use('/', apiRoutes);

app.listen( process.env.PORT );