'use client';
import { useState } from 'react';
import axios from "axios";
import * as S from "./Style";

const LoginForm = () =>{
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeValue = (e) =>{
    const {name, value} = e.target;

    if( name === "email" ) setEmail(value);
    if( name === "password" ) setPassword(value);
  
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const response = await axios.post("http://localhost:8080/auth/login", {email, password})
      localStorage.setItem("token", response.data.data.token);
    }
    catch(error){
      console.log("error", error);
    }
    
  }

  return(
    <S.FormLogin>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <S.TextField type='email' id="email" label="email" name='email' variant="outlined" onChange={onChangeValue} />
        <S.TextField type='password' id="password" label="password" name='password' variant="outlined" onChange={onChangeValue} />
        <S.Button variant="contained" type="submit">Entrar</S.Button>
      </form>
    </S.FormLogin>
  )
}

export default LoginForm;