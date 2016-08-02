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
        console.log(barcodeToPost.changeBarcode(cmd.trim()) + "\n");
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
        // console.log(postToBarcode.changePost(cmd.trim()) + '\n\n');
        request
            .post('http://127.0.0.1:3000/postcode')
            .type('form')
            .send({code: cmd.trim()})
            .end(function (err, res) {
                console.log(res.text)
            });

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
    setTimeout(()=>{
        router.start();
        callback();
    },200)

}