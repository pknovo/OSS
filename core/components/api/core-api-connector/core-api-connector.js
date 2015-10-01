var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (scope, Polymer) {
    var CONNECTION_RETRY_MAX = 10;
    var CONNECTION_RETRY_DELAY = 1000;
    var URL_PREFIX = "ws://";
    var CoreApiConnectorPolymer = (function () {
        function CoreApiConnectorPolymer() {
        }
        Object.defineProperty(CoreApiConnectorPolymer.prototype, "is", {
            get: function () {
                return "core-api-connector";
            },
            enumerable: true,
            configurable: true
        });
        return CoreApiConnectorPolymer;
    })();
    var CoreApiConnector = (function (_super) {
        __extends(CoreApiConnector, _super);
        function CoreApiConnector() {
            _super.apply(this, arguments);
        }
        return CoreApiConnector;
    })(CoreApiConnectorPolymer);
    Polymer(CoreApiConnector);
})(window, Polymer);
