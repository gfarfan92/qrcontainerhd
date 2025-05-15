module.exports = {


  friendlyName: 'Dashboard',


  description: 'Dashboard demo.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log('usuario logeado', this.req.session.user)
    // All done.
    return { user: this.req.session.user }

  }


};
