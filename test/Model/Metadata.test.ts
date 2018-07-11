import {Metadata} from "../../src/Model/Metadata";
import { expect } from 'chai';

describe('Model/', () => {
    describe('Metadata', () => {
        describe('.toMetadata', () => {
            it('should pass', () => {
                expect(Metadata.toMetadata({
                    'id': 1,
                    'name': 'product',
                    'level': '5'
                })).to.be.equal('id##1~~name##product~~level##5');
            });
        });

        describe('.fromMetadata', () => {
            it('should pass', () => {
                expect(Metadata.fromMetadata('id##1~~name##product~~level##5')).to.be.deep.equal({
                    'id': '1',
                    'name': 'product',
                    'level': '5'
                });

                expect(Metadata.fromMetadata('my-id')).to.be.deep.equal({
                    'id': 'my-id',
                    'name': 'my-id',
                });

                expect(Metadata.fromMetadata('name##product~~level##1')).to.be.equal(null);
            });
        });
    });
});
