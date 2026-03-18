// 1. Plantilla para el equipo de Ventas (Lead Completo)
export const leadAlertTemplate = (data: { nombre: string; apellido: string; email: string; celular?: string; interesSeleccionado: string; fechaNacimiento: string }) => `
  <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; margin: 0 auto;">
    <h2 style="color: #000; border-bottom: 2px solid #333; padding-bottom: 10px;">🚨 Nuevo Lead Registrado</h2>
    <p>Se ha recibido una nueva solicitud desde la web:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; font-weight: bold;">Nombre:</td><td>${data.nombre} ${data.apellido}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${data.email}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Celular:</td><td>${data.celular || 'No provisto'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Interés:</td><td>${data.interesSeleccionado}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">F. Nacimiento:</td><td>${data.fechaNacimiento}</td></tr>
    </table>
    <p style="margin-top: 20px; font-size: 12px; color: #888;">Este es un mensaje automático del sistema beta.</p>
  </div>
`;

// 2. Plantilla para el Cliente (Potential Lead / Brochure)
export const brochureCustomerTemplate = (nombre: string, brochureName: string, brochureUrl: string) => `
  <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; text-align: center; padding: 40px; background-color: #f9f9f9;">
    <h1 style="color: #1a1a1a;">¡Hola, ${nombre}!</h1>
    <p style="font-size: 16px; line-height: 1.5;">Gracias por tu interés en nuestra experiencia: <strong>${brochureName}</strong>.</p>
    <p>Tal como lo solicitaste, aquí tienes la información detallada para que empieces a planear tu próximo viaje.</p>
    <div style="margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${brochureUrl}"
         style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase;">
        Descargar Brochure (PDF)
      </a>
    </div>
    <p style="font-size: 14px; color: #666;">Si tienes dudas, responde a este correo y un asesor te ayudará.</p>
  </div>
`;