module.exports = {

  friendlyName: 'Session check',

  description: '',

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {

    // Acceder a req y res
    const req = this.req;
    const res = this.res;

    // Manejo de la sesión
    if (!req.session.visitas) {
      req.session.visitas = 1;
    } else {
      req.session.visitas++;
    }

    // Responder con el número de visitas
    return res.json({
      mensaje: 'Sesión activa',
      visitas: req.session.visitas
    });

  }

};
