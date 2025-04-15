const Token = require('../models/tokenModel');
const MicroService = require('./MicroService');
const crypto = require('crypto');

// aqui valido que sea correo hostdime

const isValidInstitutionalEmail= (email)=>{
    return /@hostdime\.(co|com\.co|com)$/.test(email);
};

//se crearea token

const generateToken =()=>{
    return Math.floor(100000+Math.random() * 900000) .toString();

};

//usare el MICROSERVICE.JS para enviar correo 

const sendTokenEmail =async (email,token) => {
    const html = `<p>Tu código de inicio de sesión es: <strong>${token}</strong></p><p>Este código es válido por 10 minutos.</p>`;

const dataPost={
    transporter:"hostdime.com.co",
    from: "notifications@hostdime.com.co",
    to: email,
    subject:"Tu cosigo de inicio de sesion",
    html: html,
    replyTo:"transactional64hostdime.com.co"
};
const result = await MicroService.Mail(dataPost);
return result;
};

//guardamos en token (tener pilas donde)

const storeToken = async (email) => {
    const token = generateToken();

    await Token.findOneAndUpdate(
        {email},
        {
            email,
            token,
            expiresAt: Date.now() + 10 * 60 * 1000,
        },
        {upsert:true}
    );
    await sendTokenEmail(email,token);

    return token;
};





    //si el token esta bn y eliminar si es valido

    const verifyToken =async (email, token) => {
        const tokenRecord = await Token.findOne({email});

        if(!tokenRecord){
            return {valid:false, reason:"Token no encontrado"}};
        if(tokenRecord.token !== token){
            return {valid:false, reason: "Token incorrecto"};

        }
        if (Date.now() > tokenRecord.expiresAt){
            return { valid: false, reason: "Token expirado" };

        }

        //elimino el token valido

        await Token.deleteOne({email});
        return {valid:true}
    };

    module.exports ={
        isValidInstitutionalEmail,
        storeToken,
        verifyToken
    };