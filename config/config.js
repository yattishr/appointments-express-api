var config = {};

config.dbhost = process.env.DBHOST || 'mongoadmin:h@ck1234@s235418.mlab.com:35418/appointments';
config.host = process.env.HOST || 'http://localhost';

module.exports = config;
