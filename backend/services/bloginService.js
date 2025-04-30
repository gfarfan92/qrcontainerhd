const { saveToken, getTokenData } = require('./tokenStore');
const MicroService = require('./MicroService');

function isValidInstitutionalEmail(email) {
  return /@(hostdime\.co|hostdime\.com\.co|hostdime\.com)$/i.test(email);
}

function generateToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendTokenEmail(email, token) {
  const html = `<p>Tu código de inicio de sesión es: <strong>${token}</strong></p>
                <p>Este código es válido por 10 minutos.</p>`;
  const dataPost = {
    transporter: 'hostdime.com.co',
    from: 'notifications@hostdime.com.co',
    to: email,
    subject: 'Tu código de inicio de sesión',
    html,
    replyTo: 'transactional@hostdime.com.co'
  };
  await MicroService.Mail(dataPost);
}

async function storeAndSendToken(email) {
  const token = generateToken();
  saveToken(email, token);
  await sendTokenEmail(email, token);
  return token;
}

function getExistingToken(email) {
  return getTokenData(email);
}

module.exports = {
  isValidInstitutionalEmail,
  storeAndSendToken,
  getExistingToken
};
