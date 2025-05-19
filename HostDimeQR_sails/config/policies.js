/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'isLoggedIn', // Aplica la política a todas las acciones por defecto

 'session/get-view':true,
 'session/check':true,
 'session/post-view': true,
 'token/validar':true,
 'estilosqr/save-style': true,  
 'estilosqr/delete-styles': true, 



};
