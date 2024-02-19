'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const GoalsUpdate = ({ metaId }) => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataMeta, setDataMeta ] = useState();
  const [ userId, setUserId ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'dataMeta') setDataMeta(value)
  }

  useEffect(() => {
    const getMeta = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/goals/${ metaId }`, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setDescricao(response.data.data.description)
        setValor(response.data.data.value)
        setDataMeta(response.data.data.date)
        setUserId(response.data.data.user_id)
      }
      catch (error) {
        let errorMessage = "Ocorreu um erro desconhecido.";
        if (error.response && error.response.error) {
          errorMessage = error.response.error;
        }
        setNotification({
          open: true,
          message: errorMessage,
          severity: 'error'
        });
      }
    }

    getMeta()
  }, [ metaId ])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8080/goals/${ metaId }`, {
        description: descricao,
        value: valor,
        date: dataMeta,
        user_id: userId
      }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Meta ${ descricao } atualizada com sucesso!`,
        severity: 'success'
      
      })
    }
    catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido.";
      if (error.response && error.response.error) {
        errorMessage = error.response.error;
      }
      setNotification({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
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
      <S.Form onSubmit={ onSumbmit }>
        <S.H1>Atualizar Meta</S.H1>
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" value={ descricao } color='primary' fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" value={ valor } color='primary' fullWidth />
        <S.TextField name="dataMeta" onChange={ onChangeValue } label="Data" variant="outlined" value={ dataMeta } color='primary' fullWidth />
        <S.Button variant="contained" color="success" type="submit">Enviar</S.Button>
      </S.Form>

      <S.Snackbar open={ notification.open } autoHideDuration={ 3000 } onClose={ handleClose }>
        <S.Alert onClose={ handleClose } severity={ notification.severity } variant="filled" sx={{ width: '100%' }}>
          { notification.message }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default GoalsUpdate;