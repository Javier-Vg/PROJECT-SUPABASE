import "./App.css";
import { MyRoutes } from "./routers/routes";
import { AuthContextProvider } from "./context/AuthContext";



function App() {
  return (

    <AuthContextProvider>
      <MyRoutes />
    </AuthContextProvider>
    
    
  );
}

export default App;
