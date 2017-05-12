var chai = require('chai');
var expect = chai.expect;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //REMOVER

var config = {
    "protocol": "https",
    "host": "[HOST]",
    "port": "[PORT]",
    "basicAuth": "[BASE64 user:pass]",
    "clientId": "[CLIENT ID]",
    "client_secret": "[ClIENT SECRET]",
    "newUserEndpoint": "/api/identity/user/v0.9/me",
    "oauthTokenEndpoint": "/oauth2/token"
}

var wso2isWrapper = require('../src/wso2is-wrapper')(config);
var addNewUser = wso2isWrapper.addNewUser;
var login = wso2isWrapper.login;

describe('#login', function() {
    it('login', function(done) {
        var user = {"username": "rdemorais.freitas@gmail.com", "password": "123456"};
        login(user)
        .then(function(results) {
            expect(results.code).to.equal(200);
            console.log(results);
            done();
        }).catch(function(err) {
            done(err);
        });
    });
});

describe('#newUser', function() {
    it('adding a new user', function(done) {
        var user = {"user": {"username": "rdemorais.freitas@gmail.com","realm": "PRIMARY", "password": "123456","roles":["CLIENTE_SIMULADOR"],"claims": [{"uri": "http://wso2.org/claims/givenname","value": "Rafael" },{"uri": "http://wso2.org/claims/emailaddress","value": "rdemorais.freitas@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Morais"},{"uri": "http://wso2.org/claims/mobile","value": "1234"} ] },"properties": []};
        addNewUser(user)
        .then(function(results) {
            expect(results.code).to.equal(201);
            done();
        }).catch(function(err) {
            done(err);
        });
    });
});