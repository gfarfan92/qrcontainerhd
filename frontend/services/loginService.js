// frontend/services/loginService.js

const BASE_QR_API = process.env.QR_API_URL || 'http://localhost:4021/api-backend/login';

/**
 * Verifica si hay una sesión activa.
 */
async function verificarSesion() {
  const resp = await fetch(`${BASE_QR_API}/verificar-sesion`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!resp.ok) throw new Error('Error al verificar sesión');
  return await resp.json();
}

async function solicitarToken(email) {
  const dominios = ["@hostdime.com","@hostdime.com.co","@hostdime.co"];
  if (!dominios.some(d => email.endsWith(d))) {
    return { exito: false, message: 'Dominio inválido' };
  }
  const resp = await fetch(`${BASE_QR_API}/solicitar-token`, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.message || 'Error en solicitarToken');
  return data;
}


async function validarToken(email, token) {
  const resp = await fetch(`${BASE_QR_API}/validar-token`, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, token })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.message || 'Error en validarToken');
  return data;
}

async function cerrarSesion() {
  const resp = await fetch(`${BASE_QR_API}/cerrar-sesion`, {
    method: 'POST',
    credentials: 'include'
  });
  if (!resp.ok) throw new Error('Error en cerrarSesion');
  return await resp.json();
}

module.exports = {
  verificarSesion,
  solicitarToken,
  validarToken,
  cerrarSesion
};
