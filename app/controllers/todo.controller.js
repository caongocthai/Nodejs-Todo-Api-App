const Todo = require('../models/todo.model.js');

// Retrieve and return all todos from the database.
exports.index = (req, res) => {
  Todo.find()
    .then(todos => {
      res.send(todos);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving todos."
    });
  });
};

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if(!req.body.title) {
    return res.status(400).send({
      message: "Todo title can not be empty"
    });
  }

  // Create a Todo
  const todo = new Todo({
    title: req.body.title,
    done: false,
  });

  // Save Todo in the database
  todo.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Todo."
    });
  });
};

// Find a single todo with a todoId
exports.show = (req, res) => {
  Todo.findById(req.params.todoId)
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Todo not found with id " + req.params.todoId
      });
    }
    return res.status(500).send({
      message: "Error retrieving todo with id " + req.params.todoId
    });
  });
};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {
  // Find todo and update it with the request body
  Todo.findByIdAndUpdate(req.params.todoId, {
    title: req.body.title,
    done: req.body.done,
  }, {new: true})
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Todo not found with id " + req.params.todoId
      });
    }
    return res.status(500).send({
      message: "Error updating todo with id " + req.params.todoId
    });
  });
};

// Delete a todo with the specified todoId in the request
exports.destroy = (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send({message: "Todo deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Todo not found with id " + req.params.todoId
      });
    }
    return res.status(500).send({
      message: "Could not delete todo with id " + req.params.todoId
    });
  });
};
