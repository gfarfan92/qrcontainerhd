// backend/controllers/bloginController.js
const {
    isValidInstitutionalEmail,
    storeAndSendToken,
    getExistingToken
  } = require('../services/bloginService');
  const { validateToken } = require('../services/tokenStore');
  const {
    isSessionActive,
    createSession,
    destroySession
  } = require('../services/sessionStore');
  
  async function solicitarToken(req, res) {
    const { email } = req.body;
    if (!isValidInstitutionalEmail(email)) {
      return res.status(400).json({ message: 'Correo no permitido' });
    }
    try {
      await storeAndSendToken(email);
      res.json({ message: 'Token enviado a tu correo' });
    } catch (err) {
      console.error('Error al enviar correo:', err);
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  }


  
  function validarToken(req, res) {
  const { email, token } = req.body;

  if (isSessionActive(email)) {
    return res.status(409).json({ message: 'Ya existe una sesión activa para este usuario.' });  // Usar 409 para conflicto.
  }

  if (!validateToken(email, token)) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }

  req.session.isLoggedIn = true;
  req.session.email = email;
  createSession(email, req.sessionID);  // Crea la sesión de usuario
  res.json({ message: 'Token válido. Sesión iniciada.' });
}




  async function reenviarToken(req, res) {
    const { email } = req.body;
    const token = getExistingToken(email);
    if (!token) {
      return res.status(400).json({ message: 'No hay token válido para reenviar.' });
    }
    try {
      await storeAndSendToken(email);
      res.json({ message: 'Se te reenvió el token.' });
    } catch (err) {
      console.error('Error al reenviar correo:', err);
      res.status(500).json({ message: 'Error al reenviar el correo.' });
    }
  }
  
  function cerrarSesion(req, res) {
    const email = req.session.email;
    req.session.destroy(() => {
      if (email) destroySession(email);
      res.json({ message: 'Sesión cerrada.' });
    });
  }
  
  function verificarSesion(req, res) {
    if (req.session && req.session.email) {
      return res.json({ logeado: true, email: req.session.email });
    }
    res.json({ logeado: false });
  }
  
  module.exports = {
    solicitarToken,
    validarToken,
    reenviarToken,
    cerrarSesion,
    verificarSesion
  };
  