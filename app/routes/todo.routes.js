module.exports = (app) => {
  const todos = require('../controllers/todo.controller.js');

  // Retrieve all Notes
  app.get('/todos', todos.index);

  // Create a new Note
  app.post('/todos', todos.create);

  // Retrieve a single Note with noteId
  app.get('/todos/:id', todos.show);

  // Update a Note with noteId
  app.patch('/todos/:id', todos.update);

  // Delete a Note with noteId
  app.delete('/todos/:id', todos.destroy);
};
