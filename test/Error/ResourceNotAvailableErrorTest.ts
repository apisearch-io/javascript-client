import { expect } from 'chai';
import {ResourceNotAvailableError} from "../../src/Error/ResourceNotAvailableError";

describe('ResourceNotAvailableError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(ResourceNotAvailableError.getTransportableHTTPError()).to.be.equal(404);
        });
    });
});
