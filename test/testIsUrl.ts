import {expect} from "chai";
import "mocha";

import {isURL} from "../src/util/util";

describe("test util url check", () => {
    it("test is uri", () => {
        expect(isURL(encodeURI("https://jaschke.it"))).to.equal(true);
    });
    it("test invalid uri", () => {
        expect(isURL(encodeURI("http://jaschke.it"))).to.equal(false); // https only
    });
    it("test invalid uri", () => {
        expect(isURL(encodeURI("https://rzrtziuklö"))).to.equal(false);
    });
    it("test invalid uri", () => {
        expect(isURL(encodeURI("https://jaschke.it&dghjzj"))).to.equal(false);
    });
    it("not encoded input", () => {
        expect(isURL("https://jaschke.it?test=35 76&")).to.equal(false);
    });
});
