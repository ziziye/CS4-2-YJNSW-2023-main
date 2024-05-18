"use strict";

/**
 * capability-level service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::capability-level.capability-level");
