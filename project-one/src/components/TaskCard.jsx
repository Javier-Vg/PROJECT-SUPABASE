import React from 'react'
import { useTasks } from '../context/TaskContext';

function TaskCard({task}) {

    const {deleteTask, updateTask} = useTasks();

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleDone = () => {
        updateTask(task.id, {done: !task.done}) //Lo alterna, si esta en true, lo vuelve false y viceversa
    }


    return (
        <div>
            <h2>{task.name}</h2>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => handleDone()}>Done</button>
        </div>
    )
}

export default TaskCard