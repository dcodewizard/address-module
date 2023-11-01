const express = require( 'express' );

const bodyParser = require('body-parser');
const apiRoutes = require('./routes')

const app = express();
app.use(bodyParser.json({extendedUrl: true}))

app.use('/', apiRoutes);

app.listen( process.env.PORT );