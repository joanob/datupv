module.exports = (policyContext, config, { strapi }) => {
  return process.env.ADMIN_AUTH_KEY.length > 0 && process.env.ADMIN_AUTH_KEY === policyContext.request.body.adminAuthKey
};
