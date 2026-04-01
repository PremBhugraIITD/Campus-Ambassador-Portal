import db from '../lib/db.js';
import { uploadFileBufferToS3 } from '../lib/aws.js';
const UploadController = {};

UploadController.uploadMultipleFilesToTask = async (req, res) => {
  const { task_id } = req.body;
  const user_id = req.user_id;
  // console.log(user_id);
  
  try {
    const task = await db.task.findUnique({
      where: { task_id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const currentDate = new Date();
    if (currentDate > new Date(task.deadline)) {
      return res.status(400).json({ error: 'The deadline for this task has passed. File upload is not allowed.' });
    }

    let userTask = await db.userTask.findUnique({ where: { user_id } });
    if (userTask && userTask.tasks && userTask.tasks[task_id] && task.multiple_submission === false) {
      return res.status(400).json({ error: 'Files already uploaded for this task' });
    }

    let user = await db.user.findUnique({ where: { id: user_id } });

    if (req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Process each file in the request
    const uploadedFileLinks = await Promise.all(
      req.files.map(async (file) => {
        const fileBuffer = file.buffer;  // Get the buffer from multer memory storage
        const fileName = `${user_id}-${Date.now()}-${file.originalname}`;  // Generate a unique file name
        const mimeType = file.mimetype;  // Get the MIME type of the file
        const folderName = `cap-submissions/${user.ca_id}`;  // Folder name in S3 bucket

        // Upload each file to S3
        const s3Data = await uploadFileBufferToS3(fileBuffer, 'rdvcap', folderName, fileName, mimeType);

        // Return the public URL for the uploaded file
        return s3Data;
      })
    );

    // Create a new task entry for the uploaded files
    const newTaskEntry = {
      approved: false,
      files: uploadedFileLinks // All uploaded file links
    };

    if (userTask) {
      const tasks = userTask.tasks || {};

      if (tasks[task_id]) {
        tasks[task_id].files.push(...uploadedFileLinks);
      } else {
        tasks[task_id] = newTaskEntry;
      }

      userTask = await db.userTask.update({
        where: { user_id },
        data: { tasks: { ...tasks } }
      });
    } else {
      userTask = await db.userTask.create({
        data: {
          user_id,
          tasks: { [task_id]: newTaskEntry }
        }
      });
    }

    res.status(201).json({ message: 'Files uploaded successfully', userTask });
  } catch (error) {
    // console.error('Error in uploadMultipleFilesToTask:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};




export default UploadController;
