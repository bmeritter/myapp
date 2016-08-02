/**
 * Created by ritter on 16-8-1.
 */
"use strict"

class Router {

    constructor(actions) {
        this.currentAction = 'init';
        this.actions = actions;
    }

    handle(cmd) {
        let router = this.actions.find(item => item.name === this.currentAction);
        let result = router.doAction(cmd);

        let newRouter = this.actions.find(item => item.name === result);
        this.currentAction = newRouter.name;
    }

    start() {
        console.log(this.actions.find(item => item.name === this.currentAction).help);
    }
}

module.exports = Router;