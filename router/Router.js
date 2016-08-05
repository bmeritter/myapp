/**
 * Created by ritter on 16-8-1.
 */
"use strict";

/*class Router {

    constructor(actions) {
        this.currentAction = 'init';
        this.actions = actions;
    }

    handle(cmd, done) {
        let router = this.actions.find(item => item.name === this.currentAction);
        let result = router.doAction(cmd, done);

        let newRouter = this.actions.find(item => item.name === result);
        this.currentAction = newRouter.name;

        this.start();
        done();
    }

    start() {
        console.log(this.actions.find(item => item.name === this.currentAction).help);
    }
}*/

class Router {
    constructor(actions) {
        this.currentActionName =
        {value: 'init'};
        this.actions = actions;
    }

    handle(cmd, outputAndExit) {
        let action = this.actions.find(v => v.name === this.currentActionName.value);

        action.doAction(cmd, outputAndExit, this.currentActionName);
    }
}

module.exports = Router;