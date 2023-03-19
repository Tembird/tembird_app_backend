const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const verificationRoute = require('./src/route/verification_route');
const UserRoute = require('./src/route/user_route');
const ScheduleRoute = require('./src/route/schedule_route');
const ColorRoute = require('./src/route/color_route');

app.use(bodyParser.json());
app.use('/api/verification', verificationRoute);
app.use('/api/user', UserRoute);
app.use('/api/schedule', ScheduleRoute);
app.use('/api/color', ColorRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;