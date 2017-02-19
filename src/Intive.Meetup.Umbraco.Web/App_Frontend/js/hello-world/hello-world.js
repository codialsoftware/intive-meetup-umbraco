export default class {
    constructor(greetingsWord = 'Hello') {
        console.info('Hello world constructor');

        this.greetingsWord = greetingsWord;
    }

    render(name) {
        return `${this.greetingsWord} ${name}!`;
    }
}