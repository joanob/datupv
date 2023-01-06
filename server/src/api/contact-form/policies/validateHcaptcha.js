'use strict';

const {verify} = require("hcaptcha")

/**
 * `validateHcaptcha` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  const {name, email, message, token} = policyContext.request.body.data

  if (!name || !email  || !message || !token) {
      return false
  }

  try {
      let { success } = await verify(secret, token)

      return success
  } catch (err) {
      return false
  }
};
