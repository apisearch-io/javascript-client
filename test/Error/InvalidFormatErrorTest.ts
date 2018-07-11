import {expect} from 'chai';
import {InvalidFormatError} from "../../src/Error/InvalidFormatError";

describe('InvalidFormatError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(InvalidFormatError.getTransportableHTTPError()).to.be.equal(400);
        });
    });
});
