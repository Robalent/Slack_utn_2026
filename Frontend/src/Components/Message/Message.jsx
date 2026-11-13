import React from 'react'
import './Message.css'

/**
 * Banner de mensajes del servidor (errores y confirmaciones).
 * Uso: <Message type="error|success">Texto del mensaje</Message>
 */
function Message({ type = 'success', children }) {
  const role = type === 'error' ? 'alert' : 'status'
  return (
    <div className={`message message--${type}`} role={role}>
      <span className="message__icon" aria-hidden="true"></span>
      <span className="message__text">{children}</span>
    </div>
  )
}

export default Message
