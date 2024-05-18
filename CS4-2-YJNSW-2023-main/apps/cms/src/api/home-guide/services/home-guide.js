'use strict';

/**
 * home-guide service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-guide.home-guide');
