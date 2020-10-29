'use strict';

import 'mocha'
import { getSound, getRandomSound, getCaracterSound } from '../../../src/commons/data/sounds';
import { assert } from 'chai';

describe('Sounds tests', () => {

   describe('getRandomSound ', () => {
        it('Ok', () => {
            assert.isNotNull(getRandomSound());
        });
    });

    describe('getCaracterSound ', () => {
        it('Ok', () => {
            assert.isNotNull(getCaracterSound('Gauvain'));
            assert.isNull(getCaracterSound('Dummy'));
        });
    });

    describe('getSound ', () => {
        it('Ok', () => {
            const s = getSound('interprete.mp3');
            assert.equal(s.file, 'interprete.mp3');
            assert.equal(s.title, 'Interprète');
            assert.equal(s.episode, 'Livre II, 03 - Le Dialogue de Paix');
            assert.equal(s.character, 'Arthur - Le Roi Burgonde');
        });
    });
});