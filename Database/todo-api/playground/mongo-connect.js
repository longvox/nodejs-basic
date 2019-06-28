const { MongoClient, ObjectID } = require('mongodb');
// const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

let id = new ObjectID();
console.log(id);
console.log(id);

MongoClient.connect(url, function(err, client) {
  // const col = client.db(dbName).collection("Todos");

  // col.insertOne(
  //   {
  //     text: "something",
  //     completed: false
  //   },
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result.ops);
  //     }
  //   }
  // );
  const col = client.db(dbName).collection('Users');
  // set _id
  col.insertOne(
    {
      // _id: 123,
      name: 'Vo Hoang Long',
      city: 'Hue',
      age: 21
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.ops[0]._id.getTimestamp());
      }
    }
  );

  client.close();
});
