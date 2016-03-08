/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;
var customLogger = new winston.Logger();
var MongoClient = require('mongodb');

var url = 'mongodb://localhost:27017/blazen';
MongoClient.connect(url, function(err, db) {
  // assert.equal(null, err);
  // console.log("Connected correctly to server.");
  customLogger.add(winston.transports.MongoDB, {
    level: "error",
    db: db
  });
});




// A console transport logging debug and above.
customLogger.add(winston.transports.Console, {
  level: 'info',
  colorize: true
});



module.exports.log = {
  // Pass in our custom logger, and pass all log levels through.
  custom: customLogger,
  level: 'info',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false
};

// module.exports.log = {
//
//   /***************************************************************************
//   *                                                                          *
//   * Valid `level` configs: i.e. the minimum log level to capture with        *
//   * sails.log.*()                                                            *
//   *                                                                          *
//   * The order of precedence for log levels from lowest to highest is:        *
//   * silly, verbose, info, debug, warn, error                                 *
//   *                                                                          *
//   * You may also set the level to "silent" to suppress all logs.             *
//   *                                                                          *
//   ***************************************************************************/
//
//   // level: 'info'
//
// };
