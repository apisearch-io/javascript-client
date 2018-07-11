import {expect} from 'chai';
import {InvalidTokenError} from "../../src/Error/InvalidTokenError";

describe('InvalidTokenError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(InvalidTokenError.getTransportableHTTPError()).to.be.equal(401);
        });
    });
});
