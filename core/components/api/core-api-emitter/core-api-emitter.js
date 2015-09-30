(function (scope) {
    var CoreApiEmitter = (function () {
        function CoreApiEmitter() {
        }
        CoreApiEmitter.prototype.beforeRegister = function () {
            this.is = "core-api-emitter";
        };
        return CoreApiEmitter;
    })();
    Polymer(CoreApiEmitter);
})(window);
