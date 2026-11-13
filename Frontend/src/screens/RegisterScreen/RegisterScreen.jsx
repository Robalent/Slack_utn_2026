import React from 'react'
import { Link } from 'react-router'
import useRequest from '../../hooks/useRequest'
import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './RegisterScreen.css'

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
    <div className="register">
      <div className="register__card">
        <h1 className="register__title">Registro de usuario</h1>
        <p className="register__subtitle">Crea tu cuenta para continuar</p>
        <Form onSubmit={handleSubmit}>
          <FormField
            label="Usuario:"
            type="text"
            name="username"
            id="username"
            value={formState.username}
            onChange={handleChangeInput}
          />
          <FormField
            label="Email:"
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChangeInput}
          />
          <FormField
            label="Contraseña:"
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={handleChangeInput}
          />
          {
            error && !loading &&
            <Message type="error">
              ERROR: {error}
            </Message>
          }
          <Button type="submit" loading={loading}>
            Registrarse
          </Button>
          {
            response && !loading &&
            <Message type="success">
              Registro exitoso. Revise su correo para validar su cuenta
            </Message>
          }
        </Form>
        <p className="register__login">
          ¿Ya tenés una cuenta?
          <Link className="register__login-link" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterScreen
