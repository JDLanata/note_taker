const notes = require('express').Router();
const fs = require('fs');
// const db = fs.readFileSync('./db/notes.json','utf-8')
const db = require('../db/notes.json')
const uniqid = require('uniqid')




// GET Route for retrieving notes information
// notes.get('/', (req, res) => {
//   // TODO: Logic for sending all the content of db/notes.json
// fs.readFile('./db/notes.json').then((data)=> res.json(JSON.parse(data)));

// });

notes.get('/notes', (req, res) =>{
    console.log(db);
    res.json(db)
}

);

// POST Route for a error logging
notes.post('/notes', (req, res) => {
  // TODO: Logic for appending data to the db/notes.json file
  const { title, text} = req.body;

   
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uniqid(),
    };
  
   db.push(newNotes);

    fs.writeFile('./db/notes.json', JSON.stringify(db, null, 4), (err) =>
    err ? console.error(err):console.log('not saved')
    
    );
  
    res.json("notes saved");
  } 

});


notes.delete('/notes/:id',(req,res) => {

const { id } = req.params;

const newId = db.findIndex(p => p.id == id);

db.splice(newId, 1); 

fs.writeFile('./db/notes.json', JSON.stringify(db, null, 4), (err) =>
err ? console.error(err):console.log('not saved')

);


return res.send('deleted?')
});


module.exports = notes;