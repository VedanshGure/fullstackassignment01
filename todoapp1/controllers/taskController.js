const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      title,
      description
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json({ message: 'Task updated successfully', task });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
