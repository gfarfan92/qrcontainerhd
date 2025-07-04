//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\index.js

const _ = require('lodash');
const fs = require("fs").promises; 
const os = require("os");
const path = require("path");

const exec = require('./exec');
const shortURL = require('./shorturl');
const generateQR = require('./generateqr');



module.exports = {
  exec,
  shortURL,
  generateQR
};