(( scope: Window, Polymer: polymer.PolymerStatic ) => {
  /**
   * Core Api Connector custom element
   * @class
   */
  class CoreApiConnector extends HTMLElement {
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
          value: "echo.websocket.org"
        }
      };
    }
    /**
     * [connected description]
     * @return {boolean} [description]
     */
    get connected(): boolean {
      return this._connector !== null && this._connector.readyState !== 3;
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
        console.log(2);
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
  }

  Polymer(CoreApiConnector);

})( window, Polymer );
