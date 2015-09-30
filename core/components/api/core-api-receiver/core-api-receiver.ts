((scope: Window) => {

  class CoreApiReceiver implements polymer.Base {

    is: string;
    properties: { [ prop: string ]: ( polymer.PropConstructorType | polymer.PropObjectType ) };

    beforeRegister() {
      this.is = "core-api-receiver";
    }
  }

  Polymer(CoreApiReceiver);

})(window);
