(( scope: Window, Polymer: polymer.PolymerStatic ) => {

  const CONNECTION_RETRY_MAX: number = 10;
  const CONNECTION_RETRY_DELAY: number = 1000;
  const URL_PREFIX: string = "ws://";

  class CoreApiConnectorPolymer implements polymer.Base  {
    get is(): string {
      return "core-api-connector";
    }
  }

  class CoreApiConnector extends CoreApiConnectorPolymer {
    public url: string;
    /**
     * Indicates if this connection should be initiated automaticly.
     *
     * @attribute auto
     * @member
     * @type {boolean}
     * @default true
     */
    public auto: boolean;
    private _connected: boolean;
  }

  Polymer( CoreApiConnector );

})( window, Polymer );
