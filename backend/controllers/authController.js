const MicroService =require('../services/MicroService');
const { saveToken, validateToken, getTokenData} = require('../services/tokenStore');
const {construirCorreoToken} = require('../utils/emailBuilder');
function generarToken6Digitos(){ 
    return Math.floor(100000 + Math.random()  * 900000) .toString();


}

exports.solicitarToken = async (req,res)=>{
    const {email}= req.body;
    const dominioValido = /@(hostdime\.co|hostdime\.com\.co|hostdime\.com)$/i;

    if(!dominioValido.test(email)){
        return res.status(400).json({ message : 'Correo no permitido'});
    }
    const token = generarToken6Digitos();

    saveToken(email,token);
    const mailData = construirCorreoToken(email,token);

    try{
        console.log("MailData generado:", mailData);

        await MicroService.Mail(mailData);
        return res.json({message: 'Token enviado a tu correo'});
    }catch (error){
        console.error("Error en MicroService.Mail:", error);
        return res.status(500).json({message : 'error al enviar el correo', error: error.message});
    }
    
}; 

exports.validarToken = (req, res) => {
    const { email, token } = req.body;
    const isValid = validateToken(email, token);
  
    console.log(`Validando token para ${email}:`, isValid);
  
    if (isValid) {
      req.session.isLoggedIn = true;
      req.session.email = email;
      return res.json({ message: 'Token válido. Sesión iniciada.' });
    } else {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
  };


exports.reenviarToken = async(req,res)=>{
    const {email}= req.body;

    const token = getTokenData(email);

    if(!token){
        return res.status(400).json({message:'no hay token valido para reenviar'})
    }
const mailData = construirCorreoToken(email,token); 
    try{
        await MicroService.Mail(mailData);
        return res.json({message:'se te reenvio token'});
    }catch (error){
        return res.status(500).json({message:'error al reenviar el correo'})
    }
}
