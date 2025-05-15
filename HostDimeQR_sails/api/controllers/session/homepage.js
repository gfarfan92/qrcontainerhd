module.exports = {

  friendlyName: 'Homepage',

  description: 'Homepage session.',

  inputs: {},

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/homepage'
    }
  },

  fn: async function (inputs, exits) {
    return exits.success();
  }

};
