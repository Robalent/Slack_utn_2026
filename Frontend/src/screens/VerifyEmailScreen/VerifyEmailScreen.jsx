import React, { useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router'
import useRequest from '../../hooks/useRequest'
import { verifyEmail } from '../../services/authService'
import Message from '../../Components/Message/Message'
import './VerifyEmailScreen.css'

function VerifyEmailScreen() {

  // El backend manda el link con el token por querystring:
  // /verify-email?verification_token=xxxxx
  const [searchParams] = useSearchParams()
  const verification_token = searchParams.get('verification_token')

  const { loading, response, error, sendRequest } = useRequest()
  const navigate = useNavigate()

  useEffect(() => {
    if (verification_token) {
      sendRequest(() => verifyEmail(verification_token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification_token])

  // Si la verificación es exitosa, redirigimos a /login
  useEffect(() => {
    if (response && !loading) {
      const redirectTimer = setTimeout(() => {
        navigate('/login')
      }, 4000)
      // limpia el timer si el componente se desmonta antes
      return () => clearTimeout(redirectTimer)
    }
  }, [response, loading, navigate])

  return (
    <div className="verify-email">
      <div className="verify-email__card">
        <h1 className="verify-email__title">Verificación de email</h1>

        {
          !verification_token &&
          <Message type="error">
            No se encontró el token de verificación. Revisá el link de tu correo.
          </Message>
        }

        {
          loading &&
          <p className="verify-email__subtitle">Verificando tu email...</p>
        }

        {
          error && !loading &&
          <Message type="error">
            ERROR: {error}
          </Message>
        }

        {
          response && !loading &&
          <Message type="success">
            ¡Email verificado con éxito! Te redirigimos al login...
          </Message>
        }

        <p className="verify-email__subtitle">
          <Link to="/login">Ir a iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailScreen
