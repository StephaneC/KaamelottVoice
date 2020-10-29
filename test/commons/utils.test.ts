'use strict';

import 'mocha';
import { assert } from 'chai';
import { getRandom } from '../../src/commons/utils';

describe('Utils tests', () => {

    describe('getRandom', () => {
        it('Ok', () => {
            assert.equal("dummy", getRandom(['dummy']));
            assert.equal(null, getRandom([]));
        });
    });
});