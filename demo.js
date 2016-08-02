/**
 * Created by ritter on 16-8-2.
 */

var request = require('sync-request');
var res = request('POST', 'http://127.0.0.1:3000/postcode', {
    headers: {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    body: 'abc=123'
});
console.log(res.getBody().toString());
//var user = JSON.parse(res.getBody('utf8'));
//console.log(user)

//console.log(request('POST', 'http://127.0.0.1:3000/postcode').getBody().toString())