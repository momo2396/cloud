const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import all route files
const firstApi = require('./routes/even_number');
const secondApi = require('./routes/matrix_multiplication');
const thirdApi = require('./routes/login_register');
const fourthApi = require('./routes/nth_largest_number');
const fifthApi = require('./routes/validation');

// Mount routes with independent base paths
app.use('/api/firstProblem', firstApi);
app.use('/api/secondProblem', secondApi);
app.use('/api/thirdProblem', thirdApi);
app.use('/api/fourthProblem', fourthApi);
app.use('/api/fifthProblem', fifthApi);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
