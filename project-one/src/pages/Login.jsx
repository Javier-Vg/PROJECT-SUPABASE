import React, { useEffect } from 'react'
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      });
      
      if (error) {
        console.error('Error de autenticación:', error.message);
        // Aquí podrías mostrar un mensaje de error al usuario
        return;
      }
      
      console.log('OTP enviado:', data);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };


  //  NOT WORKING:
  // useEffect(() => {
  //   if (supabase.auth.getUser()) {
  //     navigate("/home");
  //   }
  // },[navigate])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name='email' 
          placeholder='youreemail@site.com'
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <button>
          Send
        </button>
      </form>
    </div>
  )
}

export default Login