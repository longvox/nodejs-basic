const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/todos', authenticate, (req, res) => {
  var newTodo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo.save().then(
    doc => {
      res.status(200).send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.status(200).send({ todos });
    },
    e => res.status(400).send(e)
  );
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findById(id).then(
    todo => {
      if (!todo) {
        return res.status(404).send('empty data');
      }

      res.send({ todo });
    },
    e => {
      res.status(400).send(e);
    }
  );
});
app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findByIdAndRemove(id).then(
    todo => {
      if (!todo) {
        return res.status(404).send('empty data');
      }

      res.send({ todo });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.put('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(user => {
      console.log(user);
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  // console.log(req);
  res.send(req.user);
});

app.post('/users/login', authenticate, (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      res.send(user);
    })
    .catch(e => res.status(400).send(e));
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(3000, _ => {
  console.log('started on port 3000');
});

module.exports = { app };
