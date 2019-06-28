const { MongoClient, ObjectID } = require('mongodb');
// const test = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, function(err, client) {
  const col = client.db(dbName).collection('Users');
  // delete all result find in object
  // col.deleteMany({ name: 'Nguyen Van Loi' }).then(result => {
  //   console.log(result);
  // });

  //  delete field start in all result
  // col.deleteOne({ name: 'Vo Hoang Long' }).then(result => {
  //   console.log(result);
  // });

  // result is field just find and state
  col
    .findOneAndDelete({ _id: new ObjectID('5d0f00e0b5db6c6175b17e53') })
    .then(result => {
      console.log(result);
    });
  client.close();
});
