import React from "react";
import { Link } from 'react-router'
import { resendEmailVerification } from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useRequest from "../../hooks/useRequest.jsx";
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './ResendEmailVerificationScreen.css'

function ResendEmailVerificationScreen() {
    const initial_state = { email: '' }
    const { formState, handleChangeInput } = useForm(initial_state)
    const { loading, response, error, sendRequest } = useRequest()

    async function handleSubmit(event) {
        event.preventDefault()
        sendRequest(
            () => resendEmailVerification(formState.email)
        )
    }

    return (
        <div className="resend-email">
            <div className="resend-email__card">
                <h1 className="resend-email__title">Reenviar email de verificación</h1>
                <p className="resend-email__subtitle">
                    Ingresá tu email y te enviaremos un nuevo link para verificar tu cuenta
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
                        Reenviar email
                    </Button>
                    {
                        response && !loading &&
                        <Message type="success">
                            {response.message}
                        </Message>
                    }
                </Form>
                <p className="resend-email__login">
                    ¿Ya verificaste tu cuenta?
                    <Link className="resend-email__login-link" to="/login">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ResendEmailVerificationScreen
