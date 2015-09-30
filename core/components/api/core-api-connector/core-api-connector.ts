(( scope: Window, Polymer: polymer.PolymerStatic ) => {

  class CoreApiConnector extends HTMLElement {

    public auto: boolean;
    public url: string;
    private connector: WebSocket;

    get is(): string {
      return "core-api-connector";
    }

    get properties(): { [ prop: string ]: polymer.PropObjectType } {
      return {
        auto: {
          type: Boolean,
          value: false
        },
        url: {
          type: String,
          value: "lol what the fuck"
        }
      };
    }

    get connected(): boolean {
      return this.connector !== null && this.connector.readyState !== 3;
    }

    created() {
      this.connector = null;
      console.log(CoreApiConnector);
    }
  }

  Polymer(CoreApiConnector);

})( window, Polymer );
