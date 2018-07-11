import {User} from "../../src/Model/User";
import { expect } from 'chai';

describe('Model/', () => {
    describe('User', () => {
        describe('() Non empty attributes', () => {
            let user = new User('1', {'field': 'value'});

            it('Should construct properly', () => {
                expect(user.getId()).to.be.equal('1');
                expect(user.getAttributes()).to.be.deep.equal({'field': 'value'});
            });
        });

        describe('() Empty attributes', () => {
            let user = new User('1');

            it('Should construct properly', () => {
                expect(user.getId()).to.be.equal('1');
                expect(user.getAttributes()).to.be.deep.equal({});
            });
        });

        describe('.createFromArray()', () => {
            describe('with correct values', () => {
                let user = User.createFromArray({'id': '1', 'attributes': {'field': 'value'}});

                it('Should construct properly', () => {
                    expect(user.getId()).to.be.equal('1');
                    expect(user.getAttributes()).to.be.deep.equal({'field': 'value'});
                });
            });

            describe('with bad values', () => {
                it('Should throw exception', () => {
                    expect(function() {User.createFromArray({})}).to.throw();
                });
            });
        });

        describe('().toArray()', () => {
            let userAsArray = {'id': '1', 'attributes': {'field': 'value'}};
            expect(User.createFromArray(userAsArray).toArray()).to.be.deep.equal(userAsArray);
        });
    });
});
