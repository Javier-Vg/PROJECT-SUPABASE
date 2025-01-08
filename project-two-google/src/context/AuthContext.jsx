import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SUPABASE/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ( {children}) => {
    const [user, setUser] = useState([]);
    const [objPerfil, setPerfil] = useState([]);
    const navigate = useNavigate();
    
    async function asignInWithGoogle() {
        try {
            const {data, error} = supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) throw new Error("Ah ocurrido un problema durante la auntenticacion")

            return data
        } catch (error) {
            
        }
    }

    async function signOut() {
        const {error} = await supabase.auth.signOut();
        if (error) throw new Error("Ah ocurrido un problema duente el cierre de sesion ")
    }

    useEffect(() => {
        const {data:authListener} = supabase.auth
        .onAuthStateChange(async (event, sesion ) => {
            console.log("supavase sesion: ",sesion);
            console.log("supavase event: ",event);
            if (sesion == null){
                navigate("/login",{replace:true});
            }else{
                setUser(sesion?.user);
                console.log("Data del usuario", sesion?.user.user_metadata);
                setPerfil(sesion?.user.user_metadata); //Setea la imagen de gogle
                navigate("/",{replace:true});
            }  
        })
        return () =>{
            authListener.subscription;
        }
    },[])

    return (
        <AuthContext.Provider value = {{asignInWithGoogle, signOut, user, objPerfil}}>
            {children}
        </AuthContext.Provider>
    )
};


export const UserAuth = ()=> {
    return useContext( AuthContext);  
}