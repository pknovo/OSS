(function (scope, Polymer) {
    var URL_PREFIX = "ws://";
    var CoreApiConnector = (function () {
        function CoreApiConnector() {
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
                        value: ""
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoreApiConnector.prototype, "connected", {
            get: function () {
                return this._connector !== null && this._connector.readyState !== WebSocket.OPEN;
            },
            enumerable: true,
            configurable: true
        });
        CoreApiConnector.prototype.created = function () {
            this._connector = null;
        };
        CoreApiConnector.prototype.attached = function () {
            if (this.auto) {
                this.open();
            }
        };
        CoreApiConnector.prototype.detached = function () {
            console.log("detached...");
        };
        CoreApiConnector.prototype.connector$ = function () {
        };
        CoreApiConnector.prototype._createConnector = function () {
            return new WebSocket("" + URL_PREFIX + this.url);
        };
        CoreApiConnector.prototype.open = function () {
            var _this = this;
            var ws = this._createConnector();
            var socketOpen$ = Rx.Observer.create(function (timestamp) {
                console.log("Connection open at " + timestamp);
                ws.send("Message - " + Date.now());
            });
            var socketResponse$ = Rx.Observer.create(function (payload) {
                console.log("Sending payload... " + payload);
                ws.send(payload);
            });
            var socket$ = Rx.Observable.create(function (observer) {
                ws.onopen = function () { socketOpen$.onNext(Date.now()); };
                ws.onmessage = observer.onNext.bind(observer);
                ws.onerror = observer.onError.bind(observer);
                ws.onclose = observer.onCompleted.bind(observer);
            }), socket$, subscribe = (function (event) {
                _this.$.span.textContent = event.data;
                setTimeout(function () { socketResponse$.onNext("Message - " + Date.now()); }, 2000);
            }, function (event) {
                console.log("Error occured... " + event.reason);
            }, function () {
                console.log("Completed....");
            });
            return new Promise(function (resolve, reject) {
                _this._connector = new WebSocket("" + URL_PREFIX + _this.url);
                _this._connector.onopen = function () {
                    resolve("opened");
                };
            });
        };
        CoreApiConnector.prototype.getConnector = function () {
            var _this = this;
            return Rx.Observable.create(function (observer) {
                _this._connector = new WebSocket("" + URL_PREFIX + _this.url);
                _this._connector.onopen = function () {
                    observer.onNext(_this._connector.readyState);
                };
            });
        };
        return CoreApiConnector;
    })();
    Polymer(CoreApiConnector);
})(window, Polymer);
