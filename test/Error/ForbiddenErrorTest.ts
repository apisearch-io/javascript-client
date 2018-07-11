import { expect } from 'chai';
import {ForbiddenError} from "../../src/Error/ForbiddenError";

describe('ForbiddenError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(ForbiddenError.getTransportableHTTPError()).to.be.equal(403);
        });
    });
});
