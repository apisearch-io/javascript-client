import {expect} from 'chai';
import {ResourceExistsError} from "../../src/Error/ResourceExistsError";

describe('ResourceExistsError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(ResourceExistsError.getTransportableHTTPError()).to.be.equal(409);
        });
    });
});
