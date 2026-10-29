import React from 'react'
import useRequest from '../../hooks/useRequest'
import { useState } from 'react'
import useForm from '../../hooks/useForm'

function RegisterScreen() {
  
  const initial_state = {username: '', email: '', password: ''}
  const {formState, handleChangeInput} = useForm(initial_state)
  const {loading, response, error, sendRequest} = useRequest()
  
  
  
  return (
    <div>
      <h1>Registrarse</h1>
      <form >
        <div>
          <label htmlFor="username">Usuario:</label>
          <input type="text" name='username' id='username' value={formState.username} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="email"></label>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen