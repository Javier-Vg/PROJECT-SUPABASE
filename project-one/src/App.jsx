import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => { //si no existe la sesion del usuario, lo manda al login.
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
    <TaskContextProvider>
      <Routes>
        {/* <Route path="/gui_home" element={<PrivateRoute> <Home_Gui /> </PrivateRoute>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TaskContextProvider>
      
    </>
  );
}
export default App;
