import React from 'react'
import { useTasks } from '../context/TaskContext';
import { useEffect } from 'react';
import TaskCard from './TaskCard';



function TaskList({ done }) {

  const {tasks, getTasks, Loading} = useTasks();
    
    useEffect(() => {
        getTasks(done);
    },[done]);

    const renderTask = () => {
      if (Loading) {
        return <div>Cargando...</div>
      } else if (tasks == 0) {
        return <h4>No existen tareas</h4>
      }else{
        return (
          <div>
            {tasks&& (
                tasks.map((task, index) => (
                  <TaskCard key={index} task={task}/>
                ))
            )}
          </div>
        )
      }
    }

    return (
      <div>
        {renderTask()}
      </div>
    )
    
  
}

export default TaskList