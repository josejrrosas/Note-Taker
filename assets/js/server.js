// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const path = require('path');
const express = require('express');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('assets'))

// ROUTER
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));


// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

