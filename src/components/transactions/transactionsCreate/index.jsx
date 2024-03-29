'use client'
import { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const TransactionsCreate = () => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataTransaction, setDataTransaction ] = useState();
  const [ type, setType ] = useState("Receita");
  const [ categoria, setCategoria ] = useState("");
  const [ categorias, setCategorias ] = useState([]);

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });


  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'dataTransaction') setDataTransaction(value)
    if (name === 'type') setType(value)
    if (name === 'categoria') setCategoria(value)
  }

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/categories', {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setCategorias(response.data.data)
      }
      catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: 'error'
        })
      }
    }

    getCategorias()
  }, [])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/transactions', {description: descricao, value: valor, date: dataTransaction, type: type, category_id: categoria}, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Transação ${ descricao } criada com sucesso!`,
        severity: 'success'
      })
    }
    catch (error) {
      setNotification({
        open: true,
        message: error.response.error,
        severity: 'error'
      
      })
    }
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({
      open: false,
      message: '',
      severity: ''
    })
  }

  return (
    <>
      <S.Snackbar open={ notification.open } autoHideDuration={ 3000 } onClose={ handleClose }>
        <S.Alert onClose={ handleClose } severity={ notification.severity } variant="filled" sx={{ width: '100%' }}>
          { notification.message }
        </S.Alert>
      </S.Snackbar>

      <S.Form onSubmit={ onSumbmit }>
        <S.H1>Criar Transação</S.H1>
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" color='primary' fullWidth />
        <S.TextField name="dataTransaction" onChange={ onChangeValue } label="Data" variant="outlined" color='primary' fullWidth />
        <S.FormControl fullWidth>
          <S.InputLabel id="tipo">Tipo</S.InputLabel>
          <S.Select
            labelId="tipo"
            id="tipo_select"
            name="type"
            value={ type }
            label="Tipo"
            onChange={ onChangeValue }
          >
            <S.MenuItem value="Despesa">Despesa</S.MenuItem>
            <S.MenuItem value="Receita">Receita</S.MenuItem>
          </S.Select>
        </S.FormControl>
        <S.FormControl fullWidth>
          <S.InputLabel id="categoria">Categoria</S.InputLabel>
          <S.Select
            labelId="categoria"
            id="categoria_select"
            name="categoria"
            value={ categoria }
            label="Categoria"
            onChange={ onChangeValue }
          >
            { categorias.map(categoria => 
              <S.MenuItem key={ categoria.id } value={ categoria.id }>{ categoria.name }</S.MenuItem>
            ) }
          </S.Select>
        </S.FormControl>
        <S.Button variant='contained' color='success' type='submit'>Enviar</S.Button>
      </S.Form>
    </>
  )
}

export default TransactionsCreate;