import { expect } from 'chai';
import {Changes} from "../../src/Model/Changes";
import {
    TYPE_VALUE,
    TYPE_LITERAL,
    TYPE_ARRAY,
    TYPE_ARRAY_ELEMENT_ADD,
    TYPE_ARRAY_ELEMENT_DELETE,
    TYPE_ARRAY_ELEMENT_UPDATE
} from "../../src/Model/Changes";

describe('Model/', () => {
    describe('Changes', () => {
        describe('.create()', () => {
            let changes = Changes.create();

            it('Should work properly', () => {
                expect(changes.getChanges()).to.be.deep.equal([]);
            });
        });

        describe('.addChange()', () => {
            let changes = Changes.create();
            changes.addChange(
                'field1',
                'value1',
                TYPE_VALUE
            );

            it('Should work properly', () => {
                expect(changes.getChanges().length).to.be.equal(1);
                let firstChange = changes.getChanges()[0];
                expect(firstChange.field).to.be.equal('field1');
                expect(firstChange.value).to.be.equal('value1');
                expect(firstChange.type).to.be.equal(TYPE_VALUE);
            })
        });

        describe('.addChange() with default type', () => {
            let changes = Changes.create();
            changes.addChange(
                'field1',
                'value1'
            );

            it('Should work properly', () => {
                let firstChange = changes.getChanges()[0];
                expect(firstChange.type).to.be.equal(TYPE_VALUE);
            })
        });

        describe('.addChange() multiple times', () => {
            let changes = Changes.create();
            changes.addChange(
                'field1',
                'value1',
                TYPE_VALUE
            );
            changes.addChange(
                'field2',
                'value2',
                TYPE_LITERAL
            );
            it('Should work properly', () => {
                expect(changes.getChanges().length).to.be.equal(2);
                let firstChange = changes.getChanges()[0];
                expect(firstChange.field).to.be.equal('field1');
                expect(firstChange.value).to.be.equal('value1');
                expect(firstChange.type).to.be.equal(TYPE_VALUE);
                let secondChange = changes.getChanges()[1];
                expect(secondChange.field).to.be.equal('field2');
                expect(secondChange.value).to.be.equal('value2');
                expect(secondChange.type).to.be.equal(TYPE_LITERAL);
            })
        });

        describe('.* list changes', () => {
            let changes = Changes.create();
            changes.addElementInList(
                'field1',
                'value1',
                TYPE_VALUE
            );
            changes.deleteElementFromList(
                'field2',
                'condition2'
            );
            changes.updateElementFromList(
                'field3',
                'condition3',
                'value3',
                TYPE_LITERAL
            );

            it('Should work properly', () => {
                expect(changes.getChanges().length).to.be.equal(3);

                let firstChange = changes.getChanges()[0];
                expect(firstChange.field).to.be.equal('field1');
                expect(firstChange.value).to.be.equal('value1');
                expect(firstChange.condition).to.be.equal(undefined);
                expect(firstChange.type & TYPE_ARRAY).to.be.greaterThan(0);
                expect(firstChange.type & TYPE_ARRAY_ELEMENT_ADD).to.be.greaterThan(0);
                expect(firstChange.type & TYPE_VALUE).to.be.greaterThan(0);

                let secondChange = changes.getChanges()[1];
                expect(secondChange.field).to.be.equal('field2');
                expect(secondChange.value).to.be.equal(undefined);
                expect(secondChange.condition).to.be.equal('condition2');
                expect(secondChange.type & TYPE_ARRAY).to.be.greaterThan(0);
                expect(secondChange.type & TYPE_ARRAY_ELEMENT_DELETE).to.be.greaterThan(0);

                let thirdChange = changes.getChanges()[2];
                expect(thirdChange.field).to.be.equal('field3');
                expect(thirdChange.value).to.be.equal('value3');
                expect(thirdChange.condition).to.be.equal('condition3');
                expect(thirdChange.type & TYPE_ARRAY).to.be.greaterThan(0);
                expect(thirdChange.type & TYPE_ARRAY_ELEMENT_UPDATE).to.be.greaterThan(0);
                expect(thirdChange.type & TYPE_LITERAL).to.be.greaterThan(0);
            });

            let changesAsArray = [
                {
                    'field': 'field1',
                    'value': 'value1',
                    'type': TYPE_VALUE | TYPE_ARRAY_ELEMENT_ADD
                },
                {
                    'field': 'field2',
                    'condition': 'condition2',
                    'type': TYPE_ARRAY_ELEMENT_DELETE
                },
                {
                    'field': 'field3',
                    'value': 'value3',
                    'condition': 'condition3',
                    'type': TYPE_LITERAL | TYPE_ARRAY_ELEMENT_UPDATE
                }
            ];

            it('Should export to array properly', () => {
                expect(changes.toArray()).to.be.deep.equal(changesAsArray);
            });

            it('Should import from array properly', () => {
                expect(Changes.createFromArray(changesAsArray).toArray()).to.be.deep.equal(changesAsArray);
            });
        });
    });
});
