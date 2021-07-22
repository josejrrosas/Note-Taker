const fs = require('fs');

module.exports = function(app) {

  app.get('/api/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

  // post new note to db.json 
  app.post('/api/notes', function(req, res) {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(userNotes);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        return dbData;
      });
      console.log(dbData);

      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Thank you for your note!');
  });

  // delete note
  app.delete('/api/notes/:id', function(req, res) {
    const deleteNote = req.params.id;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      noteData = JSON.parse(data);
      for (let i = 0; i < noteData.length; i++) {
        if (noteData[i].id === Number(deleteNote)) {
          noteData.splice([i], 1);
        }
      }
      stringData = JSON.stringify(noteData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
  });
};