// frontend/controllers/loginController.js

const loginService = require('../services/loginService');

async function verificarSesion(req, res) {
  try {
    const data = await loginService.verificarSesion();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function solicitarToken(req, res) {
  const { email } = req.body;
  try {
    const data = await loginService.solicitarToken(email);
    // Si el servicio devuelve exito:false, enviamos 400
    const status = data.exito === false ? 400 : 200;
    return res.status(status).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function validarToken(req, res) {
  const { email, token } = req.body;
  try {
    const data = await loginService.validarToken(email, token);
    // Si el servicio retorna success:false o similar, mapea 401
    const status = data.success === false || data.valido === false ? 401 : 200;
    return res.status(status).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function cerrarSesion(req, res) {
  try {
    const data = await loginService.cerrarSesion();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  verificarSesion,
  solicitarToken,
  validarToken,
  cerrarSesion
};
