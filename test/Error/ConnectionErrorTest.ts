import { expect } from 'chai';
import {ConnectionError} from "../../src/Error/ConnectionError";

describe('ConnectionError()', () => {
    describe('', () => {
        it('Should return transportable http error', () => {
            expect(ConnectionError.getTransportableHTTPError()).to.be.equal(500);
        });
    });
});
