"use strict";

/**
 * capability-level router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::capability-level.capability-level");
