const db_path = 'data.json';
const fs = require('fs');
let json = fs.readFileSync(db_path).toString()
const memdb = require('./memdb.js');
const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors');

const app = express();
app.use(express.static('public'))
app.use(cors())

const port = 3000;

let MemDB = null;
let db_name = 'list_1';

try {
    MemDB = new memdb(db_path);
} catch(err){
    MemDB = new memdb();
    MemDB.truncate();
    console.log('Creating Database...');
}

// console.log('MemDB.save');
// MemDB.save(db_path);
// console.log('MemDB.saved');

app.get('/', (req, res) => {
  res.send({message: 'Success'})
}) 

// lists get
app.get('/lists', async (req, res, next) => {
  console.log('/lists');
  const lists= MemDB.select({
    where: {
      type: db_name
    }
  });

  res.status(200).json({
    success: 'success',
    lists: lists
  });
});

// list create
app.post('/list/:id', jsonParser, async (req, res, next) => {
  console.log('/list create');
  let id = req.params.id;
  let items = req.body;
  console.log('items:',items);

  const listObj = {
    type: db_name,
    list_id: id,
    items: items ? items : []
  };

  let newList = MemDB.insert(listObj);

  MemDB.save(db_path);
  
  res.status(201).json({
    success: 'success',
    list: newList
  });
});

// list update
app.put('/list/:id', jsonParser, async (req, res, next) => {
  console.log('/list update');
  let id = req.params.id;
  let items = req.body;

  console.log('items:',items);

  const listObj = {
    type: db_name,
    list_id: id,
    items: items
  };

  let updatedList = MemDB.update({where: {type: db_name, list_id: id}, set: listObj});
  console.log('updatedList', updatedList);
  MemDB.save(db_path);

  res.status(201).json({
    success: 'success',
    list: updatedList
  });
});

// list delete
app.delete('/list/:id', async (req, res, next) => {
  console.log('/list delete');
  let id = req.params.id;

  MemDB.delete({where: {type: db_name, list_id: id}});

  MemDB.save(db_path);

  res.status(202).json({
    success: 'success'
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})