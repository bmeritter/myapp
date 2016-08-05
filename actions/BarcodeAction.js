/**
 * Created by ritter on 16-7-29.
 */

"use strict"

const BarcodeToPost = require('../core/BarcodeToPost');
const request = require('superagent')
let barcodeToPost = new BarcodeToPost();


class BarcodeAction  {

    constructor() {
        this.name = 'inputBarcode';
       // this.help = 'input barcode state:\ninput baecode or input q init ';
    }

    doAction(cmd, outputAndExit, currentActionName ) {
        if (cmd === 'q') {
            outputAndExit("init interface:" + "\n" + "1-post to barcode" + "\n" + "2-barcode to post" + "\n" + "q-exit");
            currentActionName.value = "init";
        }
        else {
            request
                .post("http://localhost:3000/inputBarcode")
                .type('form')
                .send({code: cmd})
                .end(function (error, response) {

                    if (response.text === '') {
                        outputAndExit("input error!!!input barcode or input q to init");
                    } else {
                        outputAndExit(response.text);
                        outputAndExit("input barcode or input q to init");
                    }

                });

            currentActionName.value = "inputBarcode";
        }
    }
}

module.exports = BarcodeAction;
