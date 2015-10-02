(function (scope, Polymer) {
    var CONNECTION_RETRY_MAX = 10;
    var CONNECTION_RETRY_DELAY = 1000;
    var CONNECTION_STREAM_BUFFER_SIZE = 1;
    var URL_PREFIX = "ws://";
    function createConnector(url) {
        return new WebSocket("" + URL_PREFIX + url);
    }
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
                    emitterChannel: {
                        type: String,
                        value: ""
                    },
                    receiverChannel: {
                        type: String,
                        value: ""
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        CoreApiConnector.prototype.ready = function () {
            console.log("CoreApiConnector [READY]");
        };
        CoreApiConnector.prototype.getEmitterChannel$ = function () {
            var connector = createConnector(this.emitterChannel);
            var channelObservable$ = Rx.Observable.create(function (observer) {
                connector.onmessage = observer.onNext.bind(observer);
                connector.onerror = observer.onError.bind(observer);
                connector.onclose = observer.onCompleted.bind(observer);
            });
            var channelObserver$ = Rx.Observer.create(function (message) {
                console.log("channelObserver$ ==> " + message);
                connector.onopen = function () {
                    connector.send(message);
                };
            });
            return Rx.Subject.create(channelObserver$, channelObservable$);
        };
        return CoreApiConnector;
    })();
    Polymer(CoreApiConnector);
})(window, Polymer);
