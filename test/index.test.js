import {bootstrap} from '../src/index';

test('it should return a cool string', () => {
    expect(bootstrap()).toBe('Start coding your lib here.')
});