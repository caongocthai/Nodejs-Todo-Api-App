module.exports = (app) => {
  const todos = require('../controllers/todo.controller.js');

  // Retrieve all Notes
  app.get('/todos', todos.index);

  // Create a new Note
  app.post('/todos', todos.create);

  // Retrieve a single Note with noteId
  app.get('/todos/:noteId', todos.show);

  // Update a Note with noteId
  app.put('/todos/:noteId', todos.update);

  // Delete a Note with noteId
  app.delete('/todos/:noteId', todos.destroy);
};
