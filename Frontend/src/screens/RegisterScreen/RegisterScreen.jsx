import React from 'react'
import useRequest from '../../hooks/useRequest'
import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'

function RegisterScreen() {
  
  const initial_state = {username: '', email: '', password: ''}
  const {formState, handleChangeInput} = useForm(initial_state)
  const {loading, response, error, sendRequest} = useRequest()
  
  async function handleSubmit(event){
    event.preventDefault()
    sendRequest(
      () => register(formState.username, formState.email, formState.password)
    )
    console.log('Usuario intenta registrarse', formState)
  }
  
  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input type="text" name='username' id='username' value={formState.username} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' id='email' value={formState.email} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name='password' id='password' value={formState.password} onChange={handleChangeInput}/>
        </div>
        {
          error && !loading && <span style={{color:'red'}}>ERROR: {error}</span>
        }
        {
          loading
          ? <button type='submit' disabled={true}>Cargando...</button>
          : <button type='submit'>Registrarse</button>
        }
        {
          response && !loading && <span style={{color:'green'}}>Registro exitoso. Revise su correo para validar su cuenta</span>
        }
      </form>
    </div>
  )
}

export default RegisterScreen