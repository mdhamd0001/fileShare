import express from 'express';
import cors from 'cors';
import Mongodb from './Config/db.js';
import route from './routes/route.js'; // Import the router with your upload routes
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make the uploads folder publicly accessible
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Use your defined routes
app.use('/', route); // Use the router that handles file uploads

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    await Mongodb();
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.log("Database error:", error);
  }
});
