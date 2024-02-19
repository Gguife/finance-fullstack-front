'use client'
import { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'
import { formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as S from './style'

import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
});

export const GoalsCreate = () => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataMeta, setDataMeta ] = useState();

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

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/goals', {description: descricao, value: valor, date: dataMeta}, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Meta ${ descricao } criada com sucesso!`,
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
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' fullWidth />
        <S.TextField
          label="Valor"
          name="valor"
          onChange={ onChangeValue }
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
          variant="outlined"
          fullWidth
        />
        <S.TextField name="dataMeta" onChange={ onChangeValue } label="Data" variant="outlined" color='primary' fullWidth />
        <S.Button variant='contained' color='success' type='submit'>Enviar</S.Button>
      </S.Form>
    </>
  )
}

export default GoalsCreate;