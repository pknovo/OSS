(function (scope) {
    var CoreApiReceiver = (function () {
        function CoreApiReceiver() {
        }
        CoreApiReceiver.prototype.beforeRegister = function () {
            this.is = "core-api-receiver";
        };
        return CoreApiReceiver;
    })();
    Polymer(CoreApiReceiver);
})(window);
