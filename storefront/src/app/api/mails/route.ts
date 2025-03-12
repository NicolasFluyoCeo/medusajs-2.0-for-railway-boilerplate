import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa Resend con tu API key
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const toEmail = process.env.NEXT_PUBLIC_RESEND_TO;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Obtener fecha y hora actual
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeFormatted = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Enviar email usando Resend
    const data = await resend.emails.send({
      from: 'info@resend.ngsoccergloves.com',
      to: toEmail || '',
      subject: 'Nuevo registro para entrenamiento',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nuevo Registro de Entrenamiento</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">
                ¡Nuevo Registro para Entrenamiento!
              </h1>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                  Un nuevo usuario se ha registrado para los entrenamientos:
                </p>
                <p style="color: #333; font-size: 18px; font-weight: bold;">
                  Contacto: ${email}
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 15px;">
                  Fecha de registro: ${dateFormatted}
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 5px;">
                  Hora: ${timeFormatted}
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 14px;">
                  NG Soccer Training - Train Like Pro, Train With Pros
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
}