import React, { useContext } from 'react';
import TaskElement from '../../components/TaskElement/TaskElement';
import './Tasks.css';
import user_image from '../../assets/user_image.png';
import { capContext } from '../../store/store';
const Tasks = () => {
  const {tasks, user} = useContext(capContext);
  
  return (
    
    <div className='outer-taskPage-container'>
      <div className='inner-taskPage-container'>
        <h1>Task Board</h1>
        <div className='taskPage-user-container'>
          <div className='text-container'>       
          <div className='taskPage-user-details'>
            <img src={user_image} alt="" />
            <div>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className='user-task-points'>
            <p>POINTS EARNED: <span>{(user?.points === undefined)? "0":user?.points}</span></p>
            <p>UID: <span>{user?.ca_id}</span></p>
          </div>
          </div>
          {/* will only showed for mobile version <900px */}
            <img src={user_image} alt="" />
         
        </div>
        <div className='taskPage-title-container'>
          <ul>
            <li>TASK POINTS</li>
            <li>TASK</li>
            <li>DEADLINE</li>
            <li>STATUS</li>
            <li>SUBMIT</li>
            <li>POST LINK</li>
          </ul>
            {/* will only showed for mobile version <900px */}
          <ul>
            <li>POINTS</li>
            <li>TASK</li>
            <li>DEADLINE</li>
            <li>STATUS</li>
            <li>SUBMIT</li>
            <li>LINK</li>
          </ul>
          <hr />
        </div>
      </div>
      <div className='task-list'>
      {
        tasks?.map((task, index) => {
          return (
            <TaskElement
              key={index}
              ca_id={user?.ca_id}
              id={task?.task_id}
              tsk_pnt={task?.points}
              tsk_desc={task.description}
              tsk_dead={task?.deadline}
              tsk_link={task?.link}
              tsk_type = {task?.type}
            />
          );
        })
      }
      </div>
      
    </div>
  );
}

export default Tasks;
