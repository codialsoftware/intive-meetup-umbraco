import HelloWord from './hello-word';

describe("Given HelloWord class instance and some name", () => {
    let sut;

    beforeEach(() => {
        sut = new HelloWord();
    });

    describe("when name `XYZ` is passed to class", () => {
        it("then result shall be `Hello XYZ!`", () => {
            expect(sut.render("XYZ")).toBe("Hello XYZ!");
        });
    });
});

describe("Given HelloWord class instance with some greetings word and some name", () => {
    let sut;

    beforeEach(() => {
        sut = new HelloWord("Greetings");
    });

    describe("when name `XYZ` is passed to class", () => {
        it("then result shall be `Greetings XYZ!`", () => {
            expect(sut.render("XYZ")).toBe("Greetings XYZ!");
        });
    });
});