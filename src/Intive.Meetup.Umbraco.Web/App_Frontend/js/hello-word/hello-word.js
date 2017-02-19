export default class {
    constructor(greetingsWord = 'Hello') {
        this.greetingsWord = greetingsWord;
    }

    render(name) {
        return `${this.greetingsWord} ${name}!`;
    }
}