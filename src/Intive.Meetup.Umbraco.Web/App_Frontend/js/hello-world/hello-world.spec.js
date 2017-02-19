import HelloWorld from './hello-world';

describe("Given HelloWorld class instance and some name", () => {
    let sut;

    beforeEach(() => {
        sut = new HelloWorld();
    });

    describe("when name `XYZ` is passed to class", () => {
        it("then result shall be `Hello XYZ!`", () => {
            expect(sut.render("XYZ")).toBe("Hello XYZ!");
        });
    });
});

describe("Given HelloWorld class instance with some greetings word and some name", () => {
    let sut;

    beforeEach(() => {
        sut = new HelloWorld("Greetings");
    });

    describe("when name `XYZ` is passed to class", () => {
        it("then result shall be `Greetings XYZ!`", () => {
            expect(sut.render("XYZ")).toBe("Greetings XYZ!");
        });
    });
});