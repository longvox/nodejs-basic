const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc@';
var hashedPassword =
  '$2a$10$PkU9wmO60469ou5xA3JBW.GC0q7JN/uD5azqEeI5hM4GwzM0lbr1y';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    // console.log(hash);
    hashedPassword = hash;
  });
});

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// };

// var token = jwt.sign(data, "!abc123");
// console.log(token);

// var decode = jwt.verify(token, "!abc123");
// console.log(decode);
// decode.iat++;
// console.log(jwt.sign(decode, "!abc123"));
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'keysecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'keysecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was chaned. Do not trust');
// }
