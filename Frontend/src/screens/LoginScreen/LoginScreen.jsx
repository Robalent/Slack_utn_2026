import React, { useState } from "react";
import login from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useRequest from "../../hooks/useRequest.jsx";


function LoginScreen (){
    const initial_state = {email: '', password: ''}
    const {formState, handleChangeInput} = useForm(initial_state)
    // cuando consultemos tendremos este estado que estara guardando
    // como se hace esa consulta (en qué estado está)
    const {loading, response, error, sendRequest} = useRequest()

    async function handleSubmit(event){
        event.preventDefault()
        sendRequest(
            () => login(formState.email, formState.password)
        )
        console.log('Usuario intenta iniciar sesión', formState)
       
    }

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
                    api_response.error && !api_response.loading && <span style={{color:'red'}}>ERROR: {api_response.error}</span>
                }
                {
                    api_response.loading
                    ? <button type="submit" disabled={true}>Cargando...</button>
                    : <button type="submit">Iniciar Sesión</button>
                }
                
            </form>
        </div>
    )
}

export default LoginScreen