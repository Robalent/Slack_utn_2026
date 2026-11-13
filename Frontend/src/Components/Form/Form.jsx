import React from 'react'
import './Form.css'

/**
 * Wrapper de formulario: apila los campos verticalmente.
 */
export function Form({ className = '', children, ...props }) {
  return (
    <form className={`form ${className}`.trim()} {...props}>
      {children}
    </form>
  )
}

/**
 * Campo de formulario: label + input estilizados.
 * Las props extra se pasan directamente al <input>.
 * Uso: <FormField label="Email" name="email" type="email" value={..} onChange={..} />
 */
export function FormField({ label, className = '', ...props }) {
  const { name } = props
  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-field__label" htmlFor={props.id || name}>
        {label}
      </label>
      <input
        className="form-field__input"
        id={props.id || name}
        {...props}
      />
    </div>
  )
}

/**
 * Botón principal. Con la prop `loading` muestra un spinner
 * y queda deshabilitado manteniendo su tamaño.
 */
export function Button({ loading = false, children, className = '', ...props }) {
  return (
    <button
      className={`form-button ${className}`.trim()}
      type={props.type || 'button'}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="form-button__spinner" aria-hidden="true"></span>}
      <span className="form-button__label">{loading ? 'Cargando...' : children}</span>
    </button>
  )
}
