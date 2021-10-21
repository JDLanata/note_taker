const express = require('express')
const path = require('path')
// const api = require('./assets/js/index.js');
const notes = require('./routes/notes')

const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes',function(req,res){res.sendFile(__dirname,'./notes.html')})

app.use('/api', notes);





app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


//GET wildcard route.
app.get('/*', (req,res) => 

  res.sendFile(path.join(__dirname,'/public/notes.html'))

);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
