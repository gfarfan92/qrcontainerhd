const axiosAux = require('axios');
const https = require('https');

/** 
 * @module services/MicroService
 * @desc Service with globals functions relationated with external MicroServices<br>
 * Services can be thought of as libraries which contain functions that you might want to use in many places of your application. <br>
 * The main benefit of using services in Sails is that they are globalized, you don't have to use require() to access them.
 * @author Hawinson HDCO
 * @copyright HostDime Colombia - 2023 ©
 */

const MicroService = {

    axiosMail: null,
    /**
     * Service for request to Mail MSA
     * @param {Object} dataPost                     - Request Object {cmd: "", payload: {opts, ...} }
     * @param {callback} cb                         - Optional (Callback || Promise)
     * @example 

      var dataPost = {
          "transporter": "hostdime.com.co",
          "from": "notifications@hostdime.com.co",
          "to": "hawinson.s@hostdime.com.co",
          "bcc": "hawinson.s@hostdime.co",
          "subject": "¡Lanzamiento Nebula! interesado en la inauguración",
          "html": "Buen día; Informo que {{nameU}} ha indicado en el Bot Whatsapp que desea asistir al lanzamiento de Nebula. Relaciono a continuación sus datos de contacto y el enlace para confirmar su asistencia cuando lo contacten directamente. <p> Datos Generales <br> Nombres: {{nameU}} {{lastNameU}}<br>Cargo: {{positionU}}<br>Compa&ntilde;ia: {{companyU}}<br>Whatsapp: {{phone}}</p><p>&nbsp;</p>.  <p>Link para Agendar:<br><a href=https://www.hostdime.com.co/apps/nebula/inauguracion/editar?id={{apiVar}}>https://www.hostdime.com.co/apps/nebula/inauguracion/editar?id={{apiVar}}</a><br></p>",
          "replyTo": "transactional@hostdime.com.co",
          //"icalEvent": icalEvent,
          //"alternatives": alternatives,
          //"attachments": attachments
      };
      MicroService.Mail(dataPost, function(err, result){ console.log(result.data)});
      MicroService.Mail(dataPost, console.log);

      (async() => {
          var result = await MicroService.Mail(dataPost);
          console.log(result.data);
      })()

     */
    Mail: (dataPost, cb) => {

        if (!MicroService.axiosMail) {
            MicroService.axiosMail = axiosAux.create({
                baseURL: 'https://me.hostdime.com.co:1441/Email/mailHTML',
                // headers: { 'access_token': "SAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiV0hNQ1MtQ0xPVUQtQVBJIiwiaWF0IjoxNjc2OTkyNzAzfQ.geOaaRu2AbtxIbFnAp_Bm7l6ImYw6y31jsBptMq4dzI" },
                timeout: 3 * 60 * 1000, //3 Minutes
                httpsAgent: new https.Agent({
                    maxSockets: 400,
                    rejectUnauthorized: false
                })
            });
        }

        if (cb) {

            MicroService.axiosMail.post(null, dataPost).then(function(finalResult) {
                    //console.log(`Got the final result: ${finalResult}`);
                    return cb(null, finalResult);
                })
                .catch(function(finalResultCatch) {
                    console.log(`Got the final Catch result: ${finalResultCatch}`);
                    return cb(finalResultCatch, null);
                })

        } else {

            const promise = new Promise((resolve, reject) => {

                MicroService.axiosMail.post(null, dataPost).then(function(finalResult) {
                        resolve(finalResult);
                    })
                    .catch(function(finalResultCatch) {
                        reject(finalResultCatch);
                    })

            });

            return promise;

        }

    }};

    module.exports = MicroService;