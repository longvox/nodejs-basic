const { MongoClient, ObjectID } = require('mongodb');
// const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  const col = client.db(dbName).collection('Users');
  col
    .find()
    .toArray()
    .then(
      docs => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log('Unable to fetch todos ', err);
      }
    );
  client.close();
});
