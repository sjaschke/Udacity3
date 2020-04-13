import {expect} from "chai";
import "mocha";

import {filterImageFromURL} from "../src/util/util";

describe("test util url check", () => {
    it("test", async () => {
        const url = encodeURI("https://cdn.pixabay.com/photo/2015/11/07/11/16/coffee-1030971__340.jpg");
        const image = await filterImageFromURL(url);
        expect(image).to.be.a("string");
        expect(image.substr(-4)).to.equal(".jpg");
    });
});
