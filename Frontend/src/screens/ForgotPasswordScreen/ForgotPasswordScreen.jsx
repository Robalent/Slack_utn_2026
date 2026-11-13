import React from "react";
import { Link } from 'react-router'
import { forgotPassword } from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useRequest from "../../hooks/useRequest.jsx";
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './ForgotPasswordScreen.css'

function ForgotPasswordScreen() {
    const initial_state = { email: '' }
    const { formState, handleChangeInput } = useForm(initial_state)
    const { loading, response, error, sendRequest } = useRequest()

    async function handleSubmit(event) {
        event.preventDefault()
        sendRequest(
            () => forgotPassword(formState.email)
        )
    }

    return (
        <div className="forgot-password">
            <div className="forgot-password__card">
                <h1 className="forgot-password__title">Olvidé mi contraseña</h1>
                <p className="forgot-password__subtitle">
                    Ingresá tu email y te enviaremos un link para restablecer tu contraseña
                </p>
                <Form onSubmit={handleSubmit}>
                    <FormField
                        label="Email:"
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChangeInput}
                    />
                    {
                        error && !loading &&
                        <Message type="error">
                            ERROR: {error}
                        </Message>
                    }
                    <Button type="submit" loading={loading}>
                        Enviar
                    </Button>
                    {
                        response && !loading &&
                        <Message type="success">
                            {response.message}
                        </Message>
                    }
                </Form>
                <p className="forgot-password__login">
                    ¿Recordaste tu contraseña?
                    <Link className="forgot-password__login-link" to="/login">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordScreen
