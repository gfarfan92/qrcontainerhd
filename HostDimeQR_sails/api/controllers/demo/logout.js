module.exports = {


  friendlyName: 'Logout',


  description: 'Logout demo.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log('cerrando sesion', this.req.session.user);
    this.req.session.user = null;
    console.log('se cerro la sesion', this.req.session.user)
    // All done.
     return this.res.redirect('/');


  }


};
