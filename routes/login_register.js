const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

let usersCollection;

// MongoDB connection (connect once when file loads)
(async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('userAuthDB');
    usersCollection = db.collection('users');
    console.log('✅ Connected to MongoDB (login_register)');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
})();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  try {
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    await usersCollection.insertOne({ username, password });
    res.json({ message: '✅ Registration successful' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  try {
    const user = await usersCollection.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: '✅ Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
