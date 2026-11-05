import React, { useEffect, useState } from "react";
import {login} from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useRequest from "../../hooks/useRequest.jsx";
import {useNavigate} from 'react-router'

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
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={formState.email} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formState.password} onChange={handleChangeInput}/>
                </div>
                {
                    error && !loading && <span style={{color:'red'}}>ERROR: {error}</span>
                }
                {
                    loading
                    ? <button type="submit" disabled={true}>Cargando...</button>
                    : <button type="submit">Iniciar Sesión</button>
                }
                {
                    response && !loading && <span style={{color: 'greenyellow'}}>Inicio de sesion exitoso</span>
                }
                
            </form>
        </div>
    )
}

export default LoginScreen