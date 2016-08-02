/**
 * Created by ritter on 16-8-1.
 */

var request = require('superagent');
const repl = require('repl');

const Router = require('./router/Router');

class BarcodeAction {
    constructor() {
        this.name = 'inputBarcode';
        this.help = 'input barcode state:\ninput baecode or input q init ';
    }

    doAction(cmd) {
        if (cmd.trim() === 'q') {
            return 'init';
        }
        syncHandle(cmd.trim(), this.name);

        return 'inputBarcode';
    }

}

class InitAction {
    constructor() {
        this.name = 'init';
        this.help = 'init interface:\n1-post to barcode\n2-barcode to post\nq-exit';

    }

    doAction(cmd) {
        switch (cmd) {
            case '1':
                return 'inputPost';
            case '2':
                return 'inputBarcode';
            case 'q':
                process.exit(0);
                return;
            default:
                console.log("Invalidation Input");
                return 'init'
        }
    }
}

class InputPost {
    constructor() {
        this.name = 'inputPost';
        this.help = 'input post state:\ninput post or input q to exit'
    }

    doAction(cmd) {

        if (cmd.trim() === 'q') {
            return 'init';
        }

       syncHandle(cmd.trim(), this.name);
        return 'inputPost';
    }
}

const actions = [
    new InitAction(),
    new InputPost(),
    new BarcodeAction()
];

let router = new Router(actions);
router.start();
let replServer = repl.start({prompt: "> ", eval: handleCmd});

function handleCmd(cmd, context, filename, callback) {
    router.handle(cmd.trim());
    router.start();
    callback();

}

function syncHandle(cmd, urlName) {
    var request = require('sync-request');
    var res = request('POST', 'http://127.0.0.1:3000/'+urlName, {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: 'code='+cmd
    });
    console.log(res.getBody().toString());
}