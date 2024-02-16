'use client';
import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import axios from "axios";


const CategoriesUpdate = ({categoryId}) =>{
  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  
  useEffect(() => {
    const getCategory = async () =>{
      try{
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setName(response.data.data.name);
      setUserId(response.data.data.user_id);
      }catch(error){
        console.log("error", error)
      }
    }
    getCategory();
  }, [categoryId])
  
  
  const onChangeValue = (e) =>{
    const {name, value} = e.target;
    if( name === "name" ) setName(value);
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/categories/${categoryId}`, { name, user_id: userId }, {
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
        <h1>Atualizar Categoria</h1>
        <S.TextField type='name' id="name" label="name" name='name' variant="outlined" value={name} onChange={onChangeValue} />
        <S.Button variant="contained" type="submit">Entrar</S.Button>
      </form>
    </S.FormCategory>
  )
}

export default CategoriesUpdate;