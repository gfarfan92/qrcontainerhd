// api/policies/isLoggedIn.js

module.exports = async function (req, res, proceed) {
    if (req.session.user) {
        return proceed();
    }

   // return res.forbidden('Debes iniciar sesión para acceder a esta sección.');
    return res.redirect('/');
};
