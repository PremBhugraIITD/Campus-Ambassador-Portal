import db from '../lib/db.js';

const TaskController = {};

// Get all tasks
TaskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await db.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

TaskController.getTaskpoints = async (req, res) => {
  const user_id = req.user_id;
  if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
  }
  try {
      const userTask = await db.userTask.findUnique({
          where: { user_id: user_id },
          select: { user_credit: true }
      });

      if (!userTask) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user_id, points: userTask.user_credit });
  } catch (error) {
      console.error('Error in getTaskpoints:', error);
      res.status(500).json({ error: 'Failed to retrieve user points' });
  }
};
export default TaskController;
