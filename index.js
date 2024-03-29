const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const verificationRoute = require('./src/route/verification_route');
const UserRoute = require('./src/route/user_route');
const ColorRoute = require('./src/route/color_route');
const FeedbackRoute = require('./src/route/feedback_route');
const AnnouncementRoute = require('./src/route/announcement_route');
const DocsRoute = require('./src/route/docs_route');
const UpdateRoute = require('./src/route/update_route');
const TodoLabelRoute = require('./src/route/todo_label_route');
const DailyTodoLabelRoute = require('./src/route/daily_todo_label_route');
const DailyTodoRoute = require('./src/route/daily_todo_route');

app.use(bodyParser.json());
app.use('/api/verification', verificationRoute);
app.use('/api/user', UserRoute);
app.use('/api/color', ColorRoute);
app.use('/api/feedback', FeedbackRoute);
app.use('/api/announcement', AnnouncementRoute);
app.use('/api/docs', DocsRoute);
app.use('/api/update', UpdateRoute);
app.use('/api/todo/label', TodoLabelRoute);
app.use('/api/daily/todo/label', DailyTodoLabelRoute);
app.use('/api/daily/todo', DailyTodoRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;