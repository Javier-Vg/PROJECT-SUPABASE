import React from 'react'
import { useState, useRef } from 'react'
import { TaskContext, useTasks } from '../context/TaskContext';



function TaskForm() {

  const [taskName, setTaskName] = useState('');
  const {createTask} = useTasks();

  const {tasks, getTasks, Loading} = useTasks();

  const handleSubmit =async e => { //Interactuar con una tabla
    e.preventDefault();
    createTask(taskName)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="taskName" 
          placeholder="Write a task name" 
          onChange={(e) => setTaskName(e.target.value)}
        />
      <button disabled = {Loading}>
          {Loading ? "Añadiendo..." : "Add"}
      </button>
      </form>

    </div>
  )
}

export default TaskForm