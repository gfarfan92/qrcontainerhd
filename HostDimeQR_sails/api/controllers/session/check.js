module.exports = {

  friendlyName: 'Verificar correo y enviar token',

  description: 'Revisa si el usuario tiene sesión activa. Si no, genera token y lo envía.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true
    }
  },

  exits: {
    success: {
      description: 'Token enviado o sesión activa detectada.'
    },
    error: {
      description: 'Ocurrió un error inesperado.'
    }
  },

  fn: async function (inputs, exits) {
    try {
   
      if (this.req.session.user) {
        return exits.success({ message: 'Ya hay una sesión activa.' });
      }

      await sails.helpers.token.gensend.with({ email: inputs.email });

  
      this.req.session.pendingEmail = inputs.email;

      
 
       return this.res.redirect('/session/post-view');

    } catch (err) {
      return exits.error({ message: 'Error al enviar token.', details: err.message });
    }
  }
};
