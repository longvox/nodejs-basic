const { MongoClient, ObjectID } = require('mongodb');
// const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  const col = client.db(dbName).collection('Users');

  col
    .findOneAndUpdate(
      {
        _id: new ObjectID('5d0efa16621eb2476c4d74b4')
      },
      {
        $set: {
          name: 'Long Dep Trai'
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log(result);
    });

  client.close();
});
