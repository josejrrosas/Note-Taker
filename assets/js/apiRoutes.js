// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
const path = require('path');
const notesData = require(path.join(__dirname, '../../db/db.json'));
const fs = require("fs");

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => res.json(notesData));
  app.get('/api/notes:id'), (req,res) => res.json(notesData[Number(req.params.id)]);

  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a notes request... this data is then sent to the server...
  // Then the server saves the data to the db.json array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // req.body is available since we're using the body parsing middleware
        let newNote = req.body;
        let uniqueId = (notesData.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        notesData.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData), function(err) {
            if (err) throw (err);        
        }); 

        res.json(notesData);  
  });

};