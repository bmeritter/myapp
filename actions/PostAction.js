/**
 * Created by ritter on 16-7-29.
 */

"use strict"
const request = require('superagent');
const PostToBarcode = require('../core/PostToBarcode');

let postToBarcode = new PostToBarcode();

class InputPost {

    constructor() {
        this.name = 'inputPost';
      //  this.help = 'input post state:\ninput post or input q to exit'
    }

    doAction(cmd, outputAndExit, currentActionName ) {
        if (cmd === 'q') {
            outputAndExit("init interface:" + "\n" + "1-post to barcode" + "\n" + "2-barcode to post" + "\n" + "q-exit");
            currentActionName.value = "init";
        }
        else {
            request
                .post("http://localhost:3000/inputPost")
                .type('form')
                .send({code: cmd})
                .end(function (error, response) {

                    if (response.text === '') {
                        outputAndExit("input error!!!input post or input q to init");
                    } else {
                        outputAndExit(response.text);
                        outputAndExit("input post or input q to init");
                    }

                });

            currentActionName.value = "inputPost";
        }
    }
}

module.exports = InputPost;