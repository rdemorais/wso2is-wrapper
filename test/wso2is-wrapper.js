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
var sendRecoveryNotification = wso2isWrapper.sendRecoveryNotification;

describe('#newUser', function() {
    it('adding a new user', function(done) {
        var user = {"user": {"username": "rdemorais.freitas@gmail.com","realm": "PRIMARY", "password": "123456","roles":["CLIENTE_SIMULADOR"],"claims": [{"uri": "http://wso2.org/claims/givenname","value": "Rafael" },{"uri": "http://wso2.org/claims/emailaddress","value": "rdemorais.freitas@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Morais"},{"uri": "http://wso2.org/claims/mobile","value": "1234"} ] },"properties": []};
        addNewUser(user)
        .then(function(code) {
            expect(code).to.equal(201);
            done();
        }).catch(function(err) {
            done(err);
        });
    });
});

// describe('#updatePassword', function() {
//     it('update user password', function(done) {
//         var updatePw = {"key": uuidV4(), "password": "654321","properties": []};
//     });
// });

// describe('#sendRecoveryNotification', function() {
//     it('sending notification to recovery password', function(done) {
//         var recovery = {"user": {"username": "rdemorais.freitas@gmail.com","realm": "PRIMARY","tenant-domain":"carbon.super"},"properties": []}
//         sendRecoveryNotification(recovery)
//         .then(function(code) {
//             expect(code).to.equal(200);
//             done();
//         }).catch(function(err) {
//             done(err);
//         });
//     });
// });