'use client';
import { useState } from 'react';
import axios from "axios";
import * as S from "./Style";

const RegisterForm = () =>{
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeValue = (e) =>{
    const {name, value} = e.target;

    if( name === "name" ) setName(value);
    if( name === "email" ) setEmail(value);
    if( name === "password" ) setPassword(value);
  
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const response = await axios.post("http://localhost:8080/auth/register", {name, email, password})
      localStorage.setItem("token", response.data.data.token);
      console.log("response", response);
    }
    catch(error){
      console.log("error", error);
    }
    
  }


  return(
    <S.FormRegister>
      <form onSubmit={onSubmit}>
        <h1>Register Page</h1>

        <S.TextField type='name' id="name" label="name" name='name' variant="outlined" onChange={onChangeValue} />
        <S.TextField type='email' id="email" label="email" name='email' variant="outlined" onChange={onChangeValue} />
        <S.TextField type='password' id="password" label="password" name='password' variant="outlined" onChange={onChangeValue} />

        <S.Button variant="contained" type="submit">Cadastrar</S.Button>
      </form>
    </S.FormRegister>
  )
}

export default RegisterForm;