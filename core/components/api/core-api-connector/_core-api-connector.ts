(( scope: Window, Polymer: polymer.PolymerStatic ) => {

  const URL_PREFIX: string = "ws://";

  /**
   * Core Api Connector custom element
   * @class
   */
  class CoreApiConnector implements polymer.Base {
    $: any;
    public connection$: Rx.Observable<boolean>;
    public open$: Rx.Observable<boolean>;
    /**
     * Indicates if this connection should be initiated automaticly.
     *
     * @attribute auto
     * @member
     * @type {boolean}
     * @default true
     * @public
     */
    public auto: boolean;
    /**
     * Indicates if this connection should be initiated automaticly.
     *
     * @attribute auto
     * @member
     * @type {boolean}
     * @default true
     * @public
     */
    public url: string;
    /**
     * Indicates if this connection should be initiated automaticly.
     *
     * @attribute auto
     * @member
     * @type {boolean}
     * @default true
     * @private
     */
    private _connector: WebSocket;
    /**
     * [is description]
     * @return {string} [description]
     */
    get is(): string {
      return "core-api-connector";
    }
    /**
     * Configures Custom Element's properties
     *
     * @return {Object} Metadata regarding your Custom Element's properties,
     * which can then be accessed via an API for use by other Polymer features
     */
    get properties(): { [ prop: string ]: polymer.PropObjectType } {
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
    }
    /**
     * [connected description]
     * @return {boolean} [description]
     */
    get connected(): boolean {
      return this._connector !== null && this._connector.readyState !== WebSocket.OPEN;
    }
    /**
     * Invoked after an element instance is created and its definition
     * is registered.
     *
     * @member
     * @private
     * @function created
     */
    created(): void {
      this._connector = null;
    }
    /**
     * Invoked after an element instance is inserted into a document and this
     * document has a browsing context.
     *
     * @member
     * @private
     * @function attached
     */
    attached(): void {
      if ( this.auto ) {
        this.open();
      }
    }
    /**
     * Invoked after an element instance is removed from the document and
     * this document has a browsing context.
     *
     * @member
     * @private
     * @function detached
     */
    detached(): void {
      console.log("detached...");
    }

    connector$(): void {

    }

    _createConnector(): WebSocket {
      return new WebSocket( `${URL_PREFIX}${this.url}` );
    }

    open(): Promise<string>  {
      let ws: WebSocket = this._createConnector();

      let socketOpen$ = Rx.Observer.create<any>((timestamp: number) => {
        console.log(`Connection open at ${timestamp}`);
        ws.send(`Message - ${ Date.now() }`);
      });

      let socketResponse$ = Rx.Observer.create<string>((payload: string) => {
        console.log(`Sending payload... ${payload}`);
        ws.send(payload);
      });
      let socket$: Rx.Observable<any> = Rx.Observable.create<any>((observer) => {
        ws.onopen = () => {  socketOpen$.onNext( Date.now() ); };
        ws.onmessage = observer.onNext.bind(observer);
        ws.onerror = observer.onError.bind(observer);
        ws.onclose = observer.onCompleted.bind(observer);
      })­­­­­
      socket$.subscribe((event: MessageEvent) => {
        this.$.span.textContent = event.data;
        setTimeout( () => { socketResponse$.onNext(`Message - ${ Date.now() }`); }, 2000 );
      }, (event: CloseEvent) => {
          console.log(`Error occured... ${event.reason}`);
      }, () => {
          console.log(`Completed....`);
      });

      return new Promise<string>(( resolve, reject ) => {
        this._connector = new WebSocket( `${URL_PREFIX}${this.url}` );
        this._connector.onopen = () => {
          resolve( "opened" );
        };
      });
    }

    getConnector(): Rx.Observable<number> {
      return Rx.Observable.create<number>( observer => {
        this._connector = new WebSocket( `${URL_PREFIX}${this.url}` );
        this._connector.onopen = () => {
           observer.onNext(this._connector.readyState);
        };
      });
    }
  }

  Polymer( CoreApiConnector );

})( window, Polymer );
