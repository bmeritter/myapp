/**
 * Created by ritter on 16-8-1.
 */

var request = require('superagent');
const repl = require('repl');

const events = require('events');
const emitter = new events.EventEmitter();

const Router = require('./router/Router');
const InitAction = require(('./actions/InitAction'));
const InputPost = require(('./actions/PostAction'));
const BarcodeAction = require(('./actions/BarcodeAction'));

const actions = [
    new InitAction(),
    new InputPost(),
    new BarcodeAction()
];

let router = new Router(actions);
console.log(`
init interface:
1-post to barcode
2-barcode to post
q-exit`.trim());

let replServer = repl.start({prompt: "> ", eval: handleCmd});

function handleCmd(cmd, context, filename, callback) {
    router.handle(cmd.trim(), function (text) {
        callback(null, text);
    });}

function syncHandle(cmd, urlName, outputAndExit) {
    request
        .post('http://127.0.0.1:3000/' + urlName)
        .type('form')
        .send({code: cmd})
        .end(function (err, response) {
            if (response.text === '') {
                outputAndExit("input error!"+"Please input postcode(Input q exit):");
            } else {
                outputAndExit(response.text);
                outputAndExit("Please input postcode(Input q exit):");
            }
        });
}