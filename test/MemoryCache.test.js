const expect = require('chai').expect;
import MemoryCache from '../src/Cache/MemoryCache';

/**
 * MemorCache test
 */
describe('# Test: MemoryCache()', () => {
    let cache = new MemoryCache();
    let marvelHeroesList = ['hulk', 'spider-man', 'thing', 'wolverine'];
    let dcHeroesList = ['batman', 'superman', 'wonder-woman']

    it('should store a key:value on set()', () => {
        cache.set('marvel_heroes', marvelHeroesList);

        expect(cache.cache).to.have.own.property('marvel_heroes');
        expect(cache.cache['marvel_heroes']).to.deep.equal([
            'hulk',
            'spider-man',
            'thing',
            'wolverine'
        ]);
    });

    it('should append new cached items to the keeping the current cache intact', () => {
        cache.set('dc_heroes', dcHeroesList);

        expect(cache.cache).to.deep.equal({
            marvel_heroes: [
                'hulk',
                'spider-man',
                'thing',
                'wolverine'
            ],
            dc_heroes: [
                'batman',
                'superman',
                'wonder-woman'
            ]
        });
    });

    it('should return the value of the selected key on get()', () => {
        let selectedValue = cache.get('marvel_heroes');
        expect(selectedValue).to.deep.equal([
            'hulk',
            'spider-man',
            'thing',
            'wolverine'
        ]);
    });

    it('since there are two items on the cache, size should be 2', () => {
        expect(cache.size).to.be.equal(2);
    });

    it('should clear/flush the whole cache on clear()', () => {
        cache.clear();
        expect(cache.size).to.be.equal(0);
        expect(cache.cache).to.deep.equal({});
    });
});