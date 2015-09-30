var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (scope, Polymer) {
    var CoreApiConnector = (function (_super) {
        __extends(CoreApiConnector, _super);
        function CoreApiConnector() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(CoreApiConnector.prototype, "is", {
            get: function () {
                return "core-api-connector";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreApiConnector.prototype, "properties", {
            get: function () {
                return {
                    auto: {
                        type: Boolean,
                        value: false
                    },
                    url: {
                        type: String,
                        value: "echo.websocket.org"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreApiConnector.prototype, "connected", {
            get: function () {
                return this._connector !== null && this._connector.readyState !== 3;
            },
            enumerable: true,
            configurable: true
        });
        CoreApiConnector.prototype.created = function () {
            this._connector = null;
        };
        CoreApiConnector.prototype.attached = function () {
            if (this.auto) {
                console.log(2);
            }
        };
        CoreApiConnector.prototype.detached = function () {
            console.log("detached...");
        };
        return CoreApiConnector;
    })(HTMLElement);
    Polymer(CoreApiConnector);
})(window, Polymer);
