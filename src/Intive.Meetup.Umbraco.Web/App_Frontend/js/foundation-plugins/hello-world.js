import HelloWorld from '../hello-world/hello-world';

console.log('foundation-plugins/hello-world');

class HelloWorldPlugin {

    constructor(element, options) {
        this.$element = element;
        this.options = Object.assign(
            {},
            HelloWorldPlugin.defaults,
            this.$element.data(),
            options);

        this._init();

        Foundation.registerPlugin(this);
    }

    _init() {
        const instance = new HelloWorld(this.options.greetings);

        setTimeout(() => {
            this.$element.text(instance.render(this.options.name));
        }, 1000);
    }

    destroy() {
        Foundation.unregisterPlugin(this);
    }
}

HelloWorldPlugin.defaults = {
    greetings: 'Hello',
    name: 'no_name'
};

Foundation.plugin(HelloWorldPlugin, 'HelloWorld');