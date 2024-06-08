const bcrypy = require('bcryptjs');

const hashService = {};

hashService.hash = (plainText) => bcrypy.hash(plainText, 12);
hashService.compare = (plainText, hashValue) =>
  bcrypy.compare(plainText, hashValue);

module.exports = hashService;
