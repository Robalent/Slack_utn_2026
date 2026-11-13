/*
Templates de los emails que envía la plataforma.
Cada template es una función que devuelve { subject, html }.

Usamos tablas + estilos inline porque la mayoría de los clientes de correo
(Gmail, Outlook, etc.) no soportan <style> ni CSS externo de forma confiable.
*/
import ENVIRONMENT from "../../config/environment.config.js"

const COLORS = {
    background: "#eef2f7",
    card: "#ffffff",
    primary: "#4f46e5",
    primary_dark: "#4338ca",
    text: "#1f2937",
    text_muted: "#6b7280",
    border: "#e5e7eb",
    note_bg: "#f9fafb"
}

export function getVerificationEmail({ verification_token }) {
    const verification_url = `${ENVIRONMENT.URL_FRONTEND}/verify-email?verification_token=${verification_token}`

    const subject = "Verifica tu cuenta"

    const html = `
        <body style="margin:0; padding:0; background-color:${COLORS.background};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background}; padding:32px 16px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:${COLORS.card}; border-radius:12px; overflow:hidden; font-family:Arial, Helvetica, sans-serif; border:1px solid ${COLORS.border};">

                            <!-- Header -->
                            <tr>
                                <td align="center" style="background-color:${COLORS.primary}; padding:28px 24px;">
                                    <h1 style="margin:0; font-size:22px; font-weight:bold; color:#ffffff;">
                                        Verifica tu cuenta
                                    </h1>
                                    <p style="margin:8px 0 0; font-size:14px; color:#e0e7ff;">
                                        Estás a un paso de empezar a usar la plataforma
                                    </p>
                                </td>
                            </tr>

                            <!-- Cuerpo -->
                            <tr>
                                <td style="padding:32px 28px 8px;">
                                    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:${COLORS.text};">
                                        ¡Hola! Gracias por registrarte.
                                    </p>
                                    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:${COLORS.text};">
                                        Para confirmar que este correo electrónico te pertenece y activar tu cuenta, hacé clic en el siguiente botón:
                                    </p>
                                </td>
                            </tr>

                            <!-- Botón -->
                            <tr>
                                <td align="center" style="padding:0 28px 8px;">
                                    <a href="${verification_url}"
                                        style="display:inline-block; background-color:${COLORS.primary}; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; padding:14px 32px; border-radius:8px;">
                                        Verificar mi cuenta
                                    </a>
                                </td>
                            </tr>

                            <!-- Link alternativo -->
                            <tr>
                                <td style="padding:20px 28px 0;">
                                    <p style="margin:0 0 8px; font-size:13px; line-height:1.6; color:${COLORS.text_muted};">
                                        Si el botón no funciona, copiá y pegá este enlace en tu navegador:
                                    </p>
                                    <p style="margin:0; font-size:13px; line-height:1.6; word-break:break-all;">
                                        <a href="${verification_url}" style="color:${COLORS.primary_dark};">
                                            ${verification_url}
                                        </a>
                                    </p>
                                </td>
                            </tr>

                            <!-- Aviso -->
                            <tr>
                                <td style="padding:24px 28px 28px;">
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.note_bg}; border-radius:8px; border:1px solid ${COLORS.border};">
                                        <tr>
                                            <td style="padding:14px 16px; font-size:12px; line-height:1.6; color:${COLORS.text_muted};">
                                                Este enlace expira en <strong>7 días</strong>.<br />
                                                Si vos no creaste esta cuenta, podés ignorar este mensaje y no se realizará ningún cambio.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding:16px 28px 28px; border-top:1px solid ${COLORS.border};">
                                    <p style="margin:0; font-size:12px; color:${COLORS.text_muted};">
                                        Este es un mensaje automático, por favor no respondas a este correo.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
    `

    return { subject, html }
}
