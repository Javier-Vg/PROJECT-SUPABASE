import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';

function Home() {

  const [showTaskDone, setShowTaskDone] = useState(false)

  const navigate = useNavigate();
  const obj = useTasks()
  console.log(obj);
  

  useEffect(() => { //si no existe usuario, lo va a redireccionar al login.
    // console.log(supabase.auth.getUser());

    if (!supabase.auth.getUser()) {
      navigate("/login");
    }
  },[navigate]);

  return (
    <>
    
      <div>Home</div>

      <button onClick={() => supabase.auth.signOut()}>
        LogOut
      </button>
      <TaskForm/>

      <header>
        <span>Tasks pending</span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>
          Show Tasks done
        </button>
      </header>

      <TaskList done={showTaskDone}/>
    </>
  )
}

export default Home