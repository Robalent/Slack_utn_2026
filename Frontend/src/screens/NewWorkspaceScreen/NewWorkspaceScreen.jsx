import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import useRequest from '../../hooks/useRequest'
import useForm from '../../hooks/useForm'
import { createWorkspace } from '../../services/workspaceService'
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './NewWorkspaceScreen.css'

const DESCRIPTION_MAX_LENGTH = 1000

function NewWorkspaceScreen() {

  const initial_state = {name: '', description: ''}
  const {formState, handleChangeInput} = useForm(initial_state)
  const {loading, error, sendRequest} = useRequest()
  const navigate = useNavigate()

  async function handleSubmit(event){
    event.preventDefault()
    const response = await sendRequest(
      () => createWorkspace(formState.name, formState.description)
    )
    //Si el workspace se creó correctamente, redirigimos a la pantalla que lista los workspaces
    if (response && response.ok) {
      navigate('/home')
    }
  }

  return (
    <div className="register">
      <div className="register__card">
        <h1 className="register__title">Asigna un nombre a tu espacio de trabajo</h1>
        <p className="register__subtitle">
          Elige algo que tu equipo reconozca fácilmente, como el nombre de la empresa
          o del equipo. Puedes modificarlo cuando quieras.
        </p>
        <Form onSubmit={handleSubmit}>
          <FormField
            label="Nombre:"
            type="text"
            name="name"
            id="name"
            maxLength={30}
            placeholder="Ej: UTN Backend 2026"
            value={formState.name}
            onChange={handleChangeInput}
          />
          <div className="form-field">
            <label className="form-field__label" htmlFor="description">
              Descripción:
            </label>
            <textarea
              className="form-field__input new-workspace__textarea"
              id="description"
              name="description"
              rows={4}
              maxLength={DESCRIPTION_MAX_LENGTH}
              placeholder="¿De qué trata este espacio de trabajo?"
              value={formState.description}
              onChange={handleChangeInput}
            />
            <span className="new-workspace__counter">
              {formState.description.length}/{DESCRIPTION_MAX_LENGTH} caracteres
            </span>
          </div>
          {
            error && !loading &&
            <Message type="error">
              ERROR: {error}
            </Message>
          }
          <Button type="submit" loading={loading}>
            Crear espacio de trabajo
          </Button>
        </Form>
        <p className="register__login">
          ¿Cambias de opinión?
          <Link className="register__login-link" to="/home">
            Volver a mis espacios de trabajo
          </Link>
        </p>
      </div>
    </div>
  )
}

export default NewWorkspaceScreen
