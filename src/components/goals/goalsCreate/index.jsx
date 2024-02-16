'use client';
import { useState } from "react";
import * as S from "./style.jsx";
import axios from "axios";


const CategoriesCreate = () =>{
  const [name, setName] = useState();
  const onChangeValue = (e) =>{
    const {name, value} = e.target;

    if( name === "name" ) setName(value);

  
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/categories", { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    catch(error){
      console.log("error", error);
    }
    
  }

  return(
    <S.FormCategory>
      <form onSubmit={onSubmit}>
        <h1>Criar Categoria</h1>
        <S.TextField type='name' id="name" label="name" name='name' variant="outlined" onChange={onChangeValue} />
        <S.Button variant="contained" type="submit">Entrar</S.Button>
      </form>
    </S.FormCategory>
  )
}

export default CategoriesCreate;