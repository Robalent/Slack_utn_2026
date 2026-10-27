import React, { useState } from "react";
import login from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";


function LoginScreen (){
    const initial_state = {email: '', password: ''}
    const {formState, handleChangeInput} = useForm(initial_state)
    // cuando consultemos tendremos este estado que estara guardando
    // como se hace esa consulta (en qué estado está)
    const [api_response, setApiResponse] = useState({response:null, error: null, loading:false})

    async function handleSubmit(event){
        event.preventDefault()
        console.log('Usuario intenta iniciar sesión', formState)
        try {
            // siempre que queramos llamar a una api debemos tener estos 3 estados (loading, error, response)
            setApiResponse({loading: true, error: null, response:null})
            const response = await login(formState.email, formState.password)
            setApiResponse({loading: false, error: null, response: response})
        } catch (error) {
            // si hubo fallo guardamos en el estado guardamos el mensaje del fallo
            setApiResponse({loading:false, error:error.message, response:null})
        }
       
    }
    console.log('[Estado de la consulta de login]:',api_response)

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