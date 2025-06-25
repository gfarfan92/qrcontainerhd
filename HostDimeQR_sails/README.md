# host-dime-qr-sails

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Fri May 09 2025 15:28:35 GMT-0500 (Colombia Standard Time) using Sails v1.5.14.

<!-- Internally, Sails used [`sails-generate@2.0.13`](https://github.com/balderdashy/sails-generate/tree/v2.0.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

ssh -p 22 root@200.7.109.180
r$tyla1AwsE5Al-q2Hfbm


############################################
creacion contenedor step 1
############################################
podman rm --force micontenedor
podman pull almalinux:latest

podman run --name micontenedor --network=host --tz=America/Bogota --restart=always -d -it \
--volume /home/hdcowww/containers/nodeApps/:/apps/:z \
almalinux:latest /bin/bash -c "pwd && pm2 resurrect && /bin/bash || echo 'please, install pm2' && /bin/bash" 
sleep 3
podman exec -it micontenedor /bin/bash -c "dnf install -y gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel libpng-devel pixman-devel librsvg2 librsvg2-devel"
podman exec -it micontenedor /bin/bash -c "dnf module -y enable nodejs:18 && dnf install -y nodejs npm net-tools && npm install -g pm2 && pm2 save"
sleep 3
podman exec -it micontenedor /bin/bash


sleep 3
podman stop micontenedor
podman rm --force micontenedor


############################################
creacion contenedor step 2
############################################


podman run --name micontenedor --network=host --tz=America/Bogota --restart=always -d -it \
--volume /home/hdcowww/containers/nodeApps/:/apps/:z \
almalinux:latest /bin/bash -c "pwd && pm2 resurrect && /bin/bash || echo 'please, install pm2' && /bin/bash" 
sleep 3
podman exec -it micontenedor /bin/bash -c "dnf install -y gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel libpng-devel pixman-devel librsvg2 librsvg2-devel"
podman exec -it micontenedor /bin/bash -c "dnf module -y enable nodejs:22 && dnf install -y nodejs npm net-tools && npm install -g pm2 && pm2 save"
sleep 3
podman exec -it micontenedor /bin/bash


############################################
final CONTAINER 
############################################

######################################################
#### Create IMAGE de almalinux con canvas node 22 ####
######################################################
podman rm --force temporal_almalinux_pm2_n22
podman pull almalinux:latest
podman run --name temporal_almalinux_pm2_n22 --restart=always -d -it \
almalinux:latest /bin/bash -c "pwd && pm2 resurrect && /bin/bash || echo 'please, install pm2' && /bin/bash" 
sleep 3
podman exec -it temporal_almalinux_pm2_n22 /bin/bash -c "dnf install -y gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel libpng-devel pixman-devel librsvg2 librsvg2-devel"
podman exec -it temporal_almalinux_pm2_n22 /bin/bash -c "dnf module -y enable nodejs:22 && dnf install -y nodejs npm net-tools && npm install -g pm2 && pm2 save"
podman exec -it temporal_almalinux_pm2_n22 /bin/bash -c 'echo "export PS1=\"[\u@\h \W]\\$ \"" >> /root/.bashrc'
podman stop temporal_almalinux_pm2_n22
sleep 3
podman commit temporal_almalinux_pm2_n22 alma9_pm2_n22
podman rm --force temporal_almalinux_pm2_n22
######################################################


###############################################################
#### Create contenedor de alma9_pm2_n22 con canvas node 22 ####
###############################################################
podman run --name pm2_apps_2_canvas --network=host --tz=America/Bogota --restart=always -d -it \
--hostname pm2_container_node_canva -w=/apps/ \
--volume /home/hdcowww/containers/nodeApps/:/apps/:z \
--volume /home/hdcowww/containers/nodeApps/logs:$HOME/.pm2/logs/:z \
localhost/alma9_pm2_n22:latest /bin/bash -c "pwd && pm2 resurrect && /bin/bash || echo 'please, install pm2' && /bin/bash" 

podman exec -it pm2_apps_2_canvas /bin/bash




###############################################################
####EJEMPLO SERVICES 1 ####
###############################################################
api/controllers/service/send.js

/**
 * Module dependencies
 */
const _ = require('lodash');
const async = require('async');
// ...
const tokenSend = sails.config.custom.access_token;


/**
 * service/send.js
 *
 * Send service.
 */
module.exports = async function send(req, res) {

    let idRand = Math.floor((1 + Math.random()) * 0x1000000);;
    //console('Quick and dirty test:', req.headers);
    console.info([idRand], new Date().toLocaleString(), req.ip, "req.ips ==> ", req.ips, req.headers['x-forwarded-for'] || req.connection.remoteAddress, req.headers.origin);

    let convertToArray = function(input) { return Array.isArray(input) ? input : [input]; };
    let requests = convertToArray(req.body); // examples [{..cmd: "find"}, {..cmd: "find"}]

    console.info([idRand], JSON.stringify(requests).substring(0, 400) );
    console.time([ ${idRand} ] );

    // AUTHENTICATION FOR USED SERVICE
    let access_token = req.param('access_token') || req.headers['access_token'] || req.headers['x-access-token'];
    if (access_token != tokenSend) {
        let not_access = { "success": false, error: "401 Not Authorized", response: null };
        console.info([idRand], JSON.stringify(not_access));
        console.timeEnd([ ${idRand} ] );
        return res.status(401).json(not_access);
    }
    // AUTHENTICATION FOR USED SERVICE

    // ONLY POST
    if (req.method !== 'POST') {
        let not_access = { "success": false, error: 'Method ' + req.method + ' not allowed', response: null };
        console.info([idRand], JSON.stringify(not_access));
        console.timeEnd([ ${idRand} ] );
        return res.status(401).json(not_access);
    }
    // ONLY POST

    try {

        let limit = 21;
        let results = await async.mapLimit(requests, limit, async (item) => DNAService.exec(item));

        console.info([idRand], JSON.stringify(results));
        console.timeEnd([ ${idRand} ] );
        return res.ok(results);

    } catch (err) {

        console.log([ ${idRand} ] , err);
        console.timeEnd([ ${idRand} ] );

        return res.status(401).json({ err });
    }

###############################################################
####EJEMPLO SERVICES 1 ####
###############################################################
// api/services/QRURLService.js
const _ = require('lodash');
const async = require('async');
const moment = require('moment');

/** 
 * @module services/QRURLService
 * @desc Service with globals functions relationated<br>
 * Services can be thought of as libraries which contain functions that you might want to use in many places of your application. <br>
 * The main benefit of using services in Sails is that they are globalized, you don't have to use require() to access them.
 * @author Team Development HDCO
 * @copyright HostDime Colombia - 2024 ©
 * @requires lodash
 */

module.exports = {

    //dataRes = await QRURLService.exec(data);
    exec: async (item) => {

        let { cmd, model, payload } = item;

        if (!payload) {
            return { "success": false, response: { cmd: "payload not found" }, error: "payload not found" };
        }

        let _Model = sails.models[model.toLowerCase()];

        if (!_Model) {
            return { "success": false, response: { cmd: Model ${model} not found, error: Model ${model} not found } };
        }

        if (!_Model[cmd]) {
            return { "success": false, response: { cmd: cmd ${cmd} not found, error: Model ${cmd} not found } };
        }

        let resQuery;

        if (cmd == "shortURL") {
            resQuery = await QRURLService.shortURL(payload);
            return resQuery;
        }

        resQuery = await QRURLService.execQuery(_Model, "find", payload);

        return resQuery;
    },

    nativeQuery: async (Model, payload) => {

        return { "success": true, response: result.rows };

    },
    // await QRURLService.execQuery(_Model, "find", payload);
    shortURL: async (payload) => {
        try {
           

            return { "success": true, response: { url: "https://lk...../123123 version acortada"} };

        } catch (errR) {

            console.log(errR)
            return { "success": false, response: { cmd: Error Generating URL Short, error: errR } };

        }


    },
};

POST /service/send
[{cmd: "shortURL", payload: { url: "https://hostdime.co" } }]