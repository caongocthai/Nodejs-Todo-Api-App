module.exports = (router) => {
  const todos = require('../controllers/todo.controller.js');

  // Retrieve all Notes
  router.get('/todos', todos.index);

  // Create a new Note
  router.post('/todos', todos.create);

  // Retrieve a single Note with noteId
  router.get('/todos/:id', todos.show);

  // Update a Note with noteId
  router.patch('/todos/:id', todos.update);

  // Delete a Note with noteId
  router.delete('/todos/:id', todos.destroy);
};
