const express = require('express');
const createApp = require('./create');
const readApp = require('./read');
const updateApp = require('./update');
const deleteApp = require('./delete');

const app = express();

app.use('/api', createApp);
app.use('/api', readApp);
app.use('/api', updateApp);
app.use('/api', deleteApp);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
