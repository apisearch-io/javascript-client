import { expect } from 'chai';
import InMemoryCache from "../../src/Cache/InMemoryCache";

describe('Cache/', () => {
    describe('InMemoryCache', () => {
        describe('.set() and .get()', () => {
            let cache = new InMemoryCache();
            cache.set('key1', 'val1');
            cache.set('key2', {'a': 'val2'});
            cache.set('key3', ['val3']);

            expect(cache.get('key1')).to.be.equal('val1');
            expect(cache.get('key2')).to.be.deep.equal({'a': 'val2'});
            expect(cache.get('key3')).to.be.deep.equal(['val3']);
        });

        describe('.del()', () => {
            let cache = new InMemoryCache();
            cache.set('key1', 'val1');
            expect(cache.get('key1')).to.be.equal('val1');
            cache.del('key1');
            expect(cache.get('key1')).to.be.undefined;
        });

        describe('.clear()', () => {
            let cache = new InMemoryCache();
            cache.set('key1', 'val1');
            expect(cache.get('key1')).to.be.equal('val1');
            cache.clear();
            expect(cache.get('key1')).to.be.undefined;
        });
    });
});
