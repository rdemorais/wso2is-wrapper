var chai = require('chai');
var expect = chai.expect;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //REMOVER

var config = {
    "protocol": "https",
    "host": "[HOST]",
    "port": "[PORT]",
    "basicAuth": "[BASE64 user:pass]",
    "newUserEndpoint": "/api/identity/user/v0.9/me"
}

var wso2isWrapper = require('../src/wso2is-wrapper')(config);
var addNewUser = wso2isWrapper.addNewUser;

describe('#newUser', function() {
    it('adding a new user', function(done) {
        addNewUser({"user": {"username": "rdemorais.freitas@gmail.com","realm": "PRIMARY", "password": "serenaya","roles":["CLIENTE_SIMULADOR"],"claims": [{"uri": "http://wso2.org/claims/givenname","value": "teste" },{"uri": "http://wso2.org/claims/emailaddress","value": "rdemorais.freitas@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Morais"},{"uri": "http://wso2.org/claims/mobile","value": "+947721584558"} ] },"properties": []})
        .then(function(code) {
            expect(code).to.equal(201);
            done();
        }).catch(function(err) {
            done(err);
        });
    });
});