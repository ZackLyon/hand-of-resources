const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/colors', require('./controllers/colors.js'));

app.use('/numbers', require('./controllers/numbers.js'));

app.use('/desserts', require('./controllers/desserts.js'));

app.use('/onigiris', require('./controllers/onigiris.js'));

app.use('/legos', require('./controllers/legos.js'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
