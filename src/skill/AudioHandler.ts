'use strict';

import { HandlerInput } from 'ask-sdk';
import { interfaces, Response } from 'ask-sdk-model';
import { Plateform } from 'SkillActionLib/dist';
import { IHandler } from './IHandler';
import { playRandomSound, playCaracterSound } from '../commons/Intent.business';
import { getCaracterSound, getRandomSound } from '../commons/data/sounds';
import { getRandom } from '../commons/utils';

const appId = process.env.RADIO;

export const AudioHandler: IHandler = {

    'AudioPlayer.PlaybackStarted': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         * Confirming that requested audio file began playing.
         * Do not send any specific response.
         */
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         * Confirming that audio file completed playing.
         * Do not send any specific response.
         */
        console.log("Playback finished");

        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackStopped': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback stopped");

        //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackNearlyFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackNearlyFinished Directive received.
         * Replacing queue with the URL again.
         * This should not happen on live streams
         */
        console.log("Playback nearly finished");
        const p = new Plateform(input);
        const character = p.entities.get('character');
        let sound;
        if (character) {
            sound = getCaracterSound(character);
        } else {
            sound = getRandomSound();
        }
        p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, sound.file, 0);
        return Promise.resolve(input.responseBuilder.getResponse());

    },
    'AudioPlayer.PlaybackFailed': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and restarting playing with no output speach
         */
        return Promise.resolve(input.responseBuilder.getResponse());
    }
};