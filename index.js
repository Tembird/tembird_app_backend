const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const verificationRoute = require('./src/route/verification_route');

app.use(bodyParser.json());
app.use('/api/verification', verificationRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;