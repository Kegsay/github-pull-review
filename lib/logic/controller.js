"use strict";
var actions = require("./actions");

function Controller(dispatcher, httpApi) {
    this.dispatcher = dispatcher;
    this.httpApi = httpApi;
}

Controller.prototype.init = function() {
    this.dispatcher.register(this.onAction.bind(this));
}

Controller.prototype.onAction = function(payload) {
    switch (payload.action) {
        case "view_pr":
            this._view_pr(payload.data);
            break;
    }
};

Controller.prototype._view_pr = function(data) {
    var self = this;
    this.httpApi.getPullRequest(data.repo_id, data.request_id).done(
    function(data) {
        self.dispatcher.dispatch(actions.create("pr_info", data));
    }, function(err) {
        console.error(err);
    });
};

module.exports = Controller;