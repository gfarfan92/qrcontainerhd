module.exports = async function (req, res) {
  try {
    const routes = [];

    sails.router._privateRouter.stack.forEach(layer => {
      if (layer.route) {
        const method = Object.keys(layer.route.methods).join(', ').toUpperCase();
        routes.push(`${method} ${layer.route.path}`);
      }
    });

    return res.send(`<pre>${routes.join('\n')}</pre>`);
  } catch (err) {
    return res.serverError(err);
  }
};
