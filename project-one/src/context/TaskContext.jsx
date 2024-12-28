import { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";
import { use } from "react";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks debe estar dentro de un TaskContext");
  return context;
};

export const TaskContextProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
  const [Loading, setLoading] = useState();

  const getTasks = async ( doneStatus ) => {
    const getUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo usuario:", error.message);
        return null;
      }
      return user; // Devuelve el objeto del usuario
    };

    const user = await getUserInfo();

    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("user_id", user.id)
      .eq("done", doneStatus)
      .order("id", { ascending: true });
    //el 'from' indica de que tabla quiere traer datos, 'eq' es para decir si es el mismo id
    // 'eq("done", true)' hace que solo devuelva las tareas en true (hechas)

    if (error) throw error;
    console.log(data);

    setTasks(data);
  };

 // Función para obtener la información del usuario autenticado
  const getUserInfo = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error obteniendo usuario:", error.message);
      return null;
    }
    return user; // Devuelve el objeto del usuario
  };

// Función para crear una tarea // modificado del tutorial!!!!!!!!!!!!
  const createTask = async (taskName) => {
    setLoading(true)
    try {
      const user = await getUserInfo();
      if (!user) {
        console.log("No hay un usuario autenticado.");
        return; // Termina la ejecución si no hay usuario
      }

      // Inserta la tarea en la base de datos
      const { data, error } = await supabase
        .from("tasks")
        .insert({ name: taskName, user_id: user.id })
        .select(); // Incluye el select() para obtener los datos insertados

      if (error) {
        console.error("Error al crear la tarea:", error.message);
        throw error;
      }

      // Actualiza la lista de tareas si la inserción fue exitosa
      if (data) {
        console.log("Tarea creada:", data);
        setTasks((prev) => [...prev, ...data]); // Usa el operador spread para agregar el array completo
        setLoading(false)
      }
    } catch (error) {
      console.error("Error en createTask:", error.message);
    }
  };

  const deleteTask = async (id) => {
    console.log(id);

    const user = await getUserInfo();
    if (!user) {
      console.log("No hay un usuario autenticado.");
      return; // Termina la ejecución si no hay usuario
    };
    

    const {error, data} = await supabase
      .from('tasks')
      .delete()
      .eq("user_id", user.id)
      .eq("id", id)

    setTasks(tasks.filter(task => task.id !== id))

    if (error) throw error;

    console.log(data);
  }

  const updateTask = async (id, object) => {
    console.log(id);
    console.log(object);

    const user = await getUserInfo();
    if (!user) {
      console.log("No hay un usuario autenticado.");
      return; // Termina la ejecución si no hay usuario
    };

    const {error, data} = await supabase
      .from("tasks")
      .update(object)
      .eq("user_id", user.id)
      .eq("id", id)

    if (error) throw error;

    setTasks(tasks.filter(task => task.id !== id))

    console.log(data);
    
    

  }


  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask, Loading, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
