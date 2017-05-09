'use strict';
var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var WSO2Wrapper = function(config) {
    var client = new Client();
    this.addNewUser = function(user) {
        return new Promise(function(resolve, reject) {
            var args = {
                data: user,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + config.basicAuth
                }
            };
            var req = client.post(
                    config.protocol + "://"+ 
                    config.host + ":" + 
                    config.port + 
                    config.newUserEndpoint, args, function (data, response) {
                resolve(response.statusCode);
            });

            req.on('requestTimeout', function (req) {
                req.abort();
                reject(err);
            });

            req.on('error', function (err) {
                req.abort();
                reject(err);
            });
        });
    }
}

module.exports = function(config) {
    return new WSO2Wrapper(config);
};