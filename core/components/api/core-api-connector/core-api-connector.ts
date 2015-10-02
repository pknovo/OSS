(( scope: Window, Polymer: polymer.PolymerStatic ) => {

  const CONNECTION_RETRY_MAX: number = 10;
  const CONNECTION_RETRY_DELAY: number = 1000;
  const CONNECTION_STREAM_BUFFER_SIZE: number = 1;
  const URL_PREFIX: string = "ws://";

  function createConnector(url: string): WebSocket {
    return new WebSocket(`${URL_PREFIX}${url}`);
  }

  class CoreApiConnector implements polymer.Base {

    public emitterChannel: string;
    public receiverChannel: string;
    public auto: boolean;

    get is(): string {
      return "core-api-connector";
    }

    get properties(): { [ prop: string ]: polymer.PropObjectType } {
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
    }

    ready(): void {
      console.log("CoreApiConnector [READY]");
    }

    getEmitterChannel$(): any {
      let connector: WebSocket = createConnector(this.emitterChannel);
      let channelObservable$: Rx.Observable<any> = Rx.Observable.create<any>( observer => {
        connector.onmessage = observer.onNext.bind(observer);
        connector.onerror = observer.onError.bind(observer);
        connector.onclose = observer.onCompleted.bind(observer);
      });
      let channelObserver$: Rx.Observer<Core.ApiEvent> = Rx.Observer.create<Core.ApiEvent>((message: Core.ApiEvent) => {
        console.log(`channelObserver$ ==> ${message}`);
        connector.onopen = () => {
          connector.send(message);
        };
      });

      return Rx.Subject.create(channelObserver$, channelObservable$);
    }
  }

  Polymer( CoreApiConnector );

})( window, Polymer );
