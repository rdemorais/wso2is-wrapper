'use strict';
var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var WSO2Wrapper = function(config) {
    var client = new Client();
    var args = {
        data: "",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Basic " + config.basicAuth
        }
    };

    this.addNewUser = function(user) {
        return new Promise(function(resolve, reject) {
            args.data = user;
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
                reject(err);
            });
        });
    }
}

module.exports = function(config) {
    return new WSO2Wrapper(config);
};