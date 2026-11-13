import React, { useEffect, useState } from "react";
import { Link } from 'react-router'
import {login} from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useRequest from "../../hooks/useRequest.jsx";
import {useNavigate} from 'react-router'
import { Form, FormField, Button } from '../../Components/Form/Form'
import Message from '../../Components/Message/Message'
import './LoginScreen.css'

function LoginScreen (){
    const initial_state = {email: '', password: ''}
    const {formState, handleChangeInput} = useForm(initial_state)
    // cuando consultemos tendremos este estado que estara guardando
    // como se hace esa consulta (en qué estado está)
    const {loading, response, error, sendRequest} = useRequest()
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        sendRequest(
           () => login(formState.email, formState.password)
        )
        console.log('Usuario intenta iniciar sesión', formState)
    }

    /*
    Los efectos sirven para controlar la carga/ejecución de una función 
    Cuando la response cambie/llegue:
        - Guardar en localstorage el auth_token (para que luego podamos seguir usandolo )
        - Voy a redireccionar a /home
    */
    useEffect(
        ()=>{
            console.log('Respuesta del login:', response)
            if (response && response.data) {
                localStorage.setItem('auth_token', response.data.auth_token)
                navigate('/')
            }
        },
        [response]
    )

    return(
        <div className="login">
            <div className="login__card">
                <h1 className="login__title">Iniciar sesión</h1>
                <p className="login__subtitle">Ingresá con tu cuenta para continuar</p>
                <Form onSubmit={handleSubmit}>
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
                        Iniciar sesión
                    </Button>
                    {
                        response && !loading &&
                        <Message type="success">
                            Inicio de sesión exitoso
                        </Message>
                    }
                </Form>
                <p className="login__register">
                    ¿No tenés una cuenta?
                    <Link className="login__register-link" to="/register">
                        Registrate
                    </Link>
                </p>
                <p className="login__register">
                    ¿No llegó el email de verificación?
                    <Link className="login__register-link" to="/resend-email-verification">
                        Reenviar
                    </Link>
                </p>
                <p className="login__register">
                    <Link className="login__register-link" to="/forgot-password">
                        Olvidé mi contraseña
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginScreen
