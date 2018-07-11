import { expect } from 'chai';
import {UnsupportedContentTypeError} from "../../src/Error/UnsupportedContentTypeError";

describe('UnsupportedContentTypeError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(UnsupportedContentTypeError.getTransportableHTTPError()).to.be.equal(415);
        });
    });
});
