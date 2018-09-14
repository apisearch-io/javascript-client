import {IndexUUID} from "../../src/Model/IndexUUID";
import {Index} from "../../src/Model/Index";
import { expect } from 'chai';
import {AppUUID} from "../../src/Model/AppUUID";

describe('Model/', () => {
    describe('Index', () => {
        describe('createFromArray()', () => {
            let index = Index.createFromArray({
                'uuid': {
                    'id': 'testId'
                },
                'app_id': {
                    'id': 'testAppId'
                },
                'is_ok': true,
                'doc_count': 10,
                'size': '1kb'
            });

            it('Should work properly', () => {
                expect(index.getUUID().getId()).to.be.equal('testId');
                expect(index.getAppUUID().getId()).to.be.equal('testAppId');
                expect(index.isOk()).to.be.true;
                expect(index.getDocCount()).to.be.equal(10);
                expect(index.getSize()).to.be.equal('1kb');
            });
        });
        describe('()', () => {
            let index = new Index(
                IndexUUID.createById('testId'),
                AppUUID.createById('testAppId'),
                true,
                10,
                '1kb'
            );

            it('Should work properly', () => {
                expect(index.getUUID().getId()).to.be.equal('testId');
                expect(index.getAppUUID().getId()).to.be.equal('testAppId');
                expect(index.isOk()).to.be.true;
                expect(index.getDocCount()).to.be.equal(10);
                expect(index.getSize()).to.be.equal('1kb');
                let indexAsArray = index.toArray();
                expect(indexAsArray.uuid.id).to.be.equal('testId');
                expect(indexAsArray.app_id.id).to.be.equal('testAppId');
                expect(indexAsArray.is_ok).to.be.true;
                expect(indexAsArray.doc_count).to.be.equal(10);
                expect(indexAsArray.size).to.be.equal('1kb');
            });
        });
        describe('defaults', () => {
            let index = new Index(
                IndexUUID.createById('testId'),
                AppUUID.createById('testAppId')
            );

            it('Should work properly', () => {
                expect(index.isOk()).to.be.false;
                expect(index.getDocCount()).to.be.equal(0);
                expect(index.getSize()).to.be.equal('0kb');
            });
        });
    });
});
