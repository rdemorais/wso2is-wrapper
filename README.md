# WSO2 Identity Server Wrapper [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

This module aim to act as a wrapper to WSO2 Identity Server APIs.

### How to 

- In a terminal execute `npm install wso2is-wrapper --save`

- Open your favorite editor and type:

``` javascript
var config = {
    "protocol": "https",
    "host": "[HOST]",
    "port": "[PORT]",
    "basicAuth": "[BASE64 user:pass]",
    "newUserEndpoint": "/api/identity/user/v0.9/me"
}

var wso2isWrapper = require('wso2is-wrapper')(config);

/*
* results = {
*   data: "[DATA FROM Identity Server]",
*   code: "[RESPONSE CODE]"    
* }

* add new user
*/
addNewUser(user)
    .then(function(results) {
        
    }).catch(function(err) {

    });
```

### Methods

#### addNewUser

Receives as parameter the user to be registered against IS. 

``` json
{
  "user": {
    "username": "foo",
    "realm": "PRIMARY",
    "password": "123456",
    "claims": [
      {
        "uri": "http://wso2.org/claims/givenname",
        "value": "foo"
      },
      {
        "uri": "http://wso2.org/claims/lastname",
        "value": "last"
      },
      {
        "uri": "http://wso2.org/claims/emailaddress",
        "value": "email@ee.com"
      },
      {
        "uri": "http://wso2.org/claims/mobile",
        "value": "12345"
      }
    ]
  },
  "properties": []
}
```

### Roadmap 

- Performe connection using WSO2Carbon certificate
- Error handle
- AdminForcePasswordReset
- Change password
- SAML connection for federate login

[npm-url]: https://npmjs.org/package/wso2is-wrapper
[npm-image]: https://img.shields.io/npm/v/wso2is-wrapper.svg

[downloads-image]: https://img.shields.io/npm/dm/wso2is-wrapper.svg