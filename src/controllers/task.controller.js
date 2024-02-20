import { Task } from "../models/index.js";

export const findAllTasks = async (req, res) => {
  const { query } = req;

  const filters = Object.keys(query).length === 0 ? {} : query;

  if (filters.done && filters.done !== 'true' && filters.done !== 'false') {
    return res.status(500).json({ message: 'The done attribute has to be a boolean' });
  }

  try {
    const tasks = await Task.find(filters);

    return res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something went wrong retrieving the tasks',
    });
  }
}

export const findOneTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: `Task with ID: ${id} does not exists` });
    }

    return res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Task with id: " + id });
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;

    if (!title) {
      return res.status(500).json({
        message: 'The title is required.',
      });
    }

    if (!description) {
      return res.status(500).json({
        message: 'The description is required.',
      });
    }

    const task = new Task({ title, description, done });

    const taskSaved = await task.save();

    return res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong creating the Task",
    });
  }
}

export const updateTask = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Data update cannot be empty',
    });
  }

  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!task) {
      return res.status(404).json({ message: `Task with ID: ${id} does not exists` });
    }

    return res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error updating the Task with id: ${id}`,
    });
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: `Task with ID: ${id} does not exists` });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Error deleting the Task with id: ${id}`,
    });
  }
}
