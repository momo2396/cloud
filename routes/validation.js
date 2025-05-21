const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

let usersCollection;

// Connect to MongoDB
(async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('userAuthDB');
    usersCollection = db.collection('users');
    console.log('✅ [Validation] Connected to MongoDB');
  } catch (err) {
    console.error('❌ [Validation] MongoDB Error:', err.message);
  }
})();

// POST /api/fifth/validateUser
router.post('/validateUser', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  if (!usersCollection) {
    return res.status(503).json({ error: 'Database connection not ready' });
  }

  try {
    const user = await usersCollection.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: '✅ Validation successful' });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
