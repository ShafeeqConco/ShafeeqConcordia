const express = require('express');
const { MongoClient } = require('mongodb');

// Connection URI for your local MongoDB instance
const uri = 'mongodb://localhost:27017/IPL2023';


// Create a new Express app
const app = express();
app.use(express.json());

// Create a new MongoDB client
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Define your API endpoints
app.get('/players', async (req, res) => {
  try {
    // Connect to the MongoDB instance
    await client.connect();

    // Access the database and collection
    const db = client.db('IPL2023');
    const players = db.collection('PlayerStats');

    // Fetch all players from the collection
    const playerList = await players.find().toArray();

    // Send the player list as a response
    res.json(playerList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

app.post('/players', async (req, res) => {
  try {
    // Connect to the MongoDB instance
    await client.connect();

    // Access the database and collection
    const db = client.db('IPL2023');
    const players = db.collection('PlayerStats');

    // Create a new player based on the request body
    const newPlayer = req.body;
    await players.insertOne(newPlayer);

    // Send the newly created player as a response
    res.json(newPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
