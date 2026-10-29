import { useState } from "react";

function useRequest (){
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    async function sendRequest (requestFn){
        try {
            setLoading(true)
            const response = await requestFn()
            setResponse(response)
        } catch (error) {
            setResponse(null)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return{
        loading,
        response,
        error,
        sendRequest
    }
}

export default useRequest