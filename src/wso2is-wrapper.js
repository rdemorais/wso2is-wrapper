'use strict';
var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var WSO2Wrapper = function(config) {
    var client = new Client();
    var wso2Call = function(endpoint, args) {
        return new Promise(function(resolve, reject) {
            var req = client.post(
                    config.protocol + "://"+ 
                    config.host + ":" + 
                    config.port + 
                    endpoint, args, function (data, response) {
                var results = {
                    data: data,
                    code: response.statusCode
                }
                resolve(results);
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

    this.login = function(user) {
        var args = {
            parameters: {
                "client_id": config.clientId,
                "client_secret": config.clientSecret
            },
            data: {
                "grant_type": "password",
                "username": user.username,
                "password": user.password
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        return wso2Call(config.oauthTokenEndpoint, args);
    }

    this.addNewUser = function(user) {
        var args = {
            data: user,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Basic " + config.basicAuth
            }
        };

        return wso2Call(config.newUserEndpoint, args);
    }
}

module.exports = function(config) {
    return new WSO2Wrapper(config);
};