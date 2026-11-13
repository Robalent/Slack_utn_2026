import React, { useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router'
import useRequest from '../../hooks/useRequest'
import { resetPassword } from '../../services/authService'
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './ResetPasswordScreen.css'

function ResetPasswordScreen() {
    // El backend manda el link con el token por querystring:
    // /reset-password?reset_token=xxxxx
    const [searchParams] = useSearchParams()
    const reset_token = searchParams.get('reset_token')

    const initial_state = { password: '', confirm_password: '' }
    const { formState, handleChangeInput } = useForm(initial_state)
    const { loading, response, error, sendRequest } = useRequest()
    const navigate = useNavigate()

    // Si el restablecimiento es exitoso, redirigimos a /login
    useEffect(() => {
        if (response && !loading) {
            const redirect_timer = setTimeout(() => {
                navigate('/login')
            }, 4000)
            // limpia el timer si el componente se desmonta antes
            return () => clearTimeout(redirect_timer)
        }
    }, [response, loading, navigate])

    async function handleSubmit(event) {
        event.preventDefault()

        // Validamos que ambas contraseñas coincidan antes de consultar
        if (formState.password !== formState.confirm_password) {
            sendRequest(() => Promise.reject(new Error('Las contraseñas no coinciden')))
            return
        }

        sendRequest(
            () => resetPassword(reset_token, formState.password)
        )
    }

    return (
        <div className="reset-password">
            <div className="reset-password__card">
                <h1 className="reset-password__title">Restablecer contraseña</h1>

                {
                    !reset_token &&
                    <Message type="error">
                        No se encontró el token de restablecimiento. Revisá el link de tu correo o pedí uno nuevo.
                    </Message>
                }

                {
                    reset_token &&
                    <Form onSubmit={handleSubmit}>
                        <p className="reset-password__subtitle">
                            Ingresá tu contraseña nueva. Debe coincidir en los dos campos.
                        </p>
                        <FormField
                            label="Nueva contraseña:"
                            type="password"
                            name="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                        <FormField
                            label="Confirmar contraseña:"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            value={formState.confirm_password}
                            onChange={handleChangeInput}
                        />
                        {
                            error && !loading &&
                            <Message type="error">
                                ERROR: {error}
                            </Message>
                        }
                        <Button type="submit" loading={loading}>
                            Restablecer contraseña
                        </Button>
                        {
                            response && !loading &&
                            <Message type="success">
                                ¡Contraseña restablecida con éxito! Te redirigimos al login...
                            </Message>
                        }
                    </Form>
                }

                <p className="reset-password__login">
                    <Link to="/login">Ir a iniciar sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPasswordScreen
