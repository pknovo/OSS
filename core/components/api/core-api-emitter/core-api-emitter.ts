((scope: Window) => {

  class CoreApiEmitter implements polymer.Base {

    is: string;
    properties: { [ prop: string ]: ( polymer.PropConstructorType | polymer.PropObjectType ) };

    beforeRegister() {
      this.is = "core-api-emitter";
    }
  }

  Polymer(CoreApiEmitter);

})(window);
