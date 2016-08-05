/**
 * Created by ritter on 16-7-29.
 */

"use strict"

class InitAction  {

    constructor() {
        this.name = 'init';
       // this.help = 'init interface:\n1-post to barcode\n2-barcode to post\nq-exit';

    }

    doAction(cmd, outputAndExit, currentActionName ) {
        switch (cmd) {
            case'1':
                outputAndExit("input post state:input post or input q to init");
                currentActionName.value =  "inputPost";
                break;
            case'2':
                outputAndExit('input barcode state:input barcode or input q to init')
                currentActionName.value =  'inputBarcode';
                break;
            case'q':
                process.exit(0);
                break;
            default:
                outputAndExit( 'Invalidation Input!');
        }
    }
}
module.exports = InitAction;
