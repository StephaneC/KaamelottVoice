
'use strict';

import { HandlerInput } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { Plateform } from 'SkillActionLib/dist';
import { playRandomSound, playCaracterSound } from '../commons/Intent.business';
import { IHandler } from './IHandler';
//import { Plateform } from 'SkillActionLib/dist';

export const IntentHandler: IHandler = {
    // launch request and play intent have the same handler
    'LaunchRequest': async function (input: HandlerInput): Promise<Response> {
        console.log('LaunchRequest');
        const p = new Plateform(input);
        playRandomSound(p);
        //p.template.simpleMessage('Bienvenue sur KaamelottVoices', null, false);
        return input.responseBuilder.getResponse();
    },
    'AMAZON.HelpIntent': async function (input: HandlerInput): Promise<Response> {
        console.log('HelpIntent');
        return input.responseBuilder.getResponse();
    },
    'AMAZON.PauseIntent': async function (input: HandlerInput): Promise<Response> {
        return this['AMAZON.StopIntent'](input);
    },
    'AMAZON.StopIntent': async function (input: HandlerInput): Promise<Response> {
        const p = new Plateform(input);
        p.template.stopAudio(true);
        return input.responseBuilder.getResponse();
    },
    'AMAZON.ResumeIntent': async function (input: HandlerInput): Promise<Response> {
        console.log('ResumeIntent');
        return this['LaunchRequest'](input);
    },
    'AMAZON.NextIntent': async function (input: HandlerInput): Promise<Response> {
        input.responseBuilder
        .speak('Cette fonctionnalité n\'est pas disponible')
        .withShouldEndSession(false);
        return input.responseBuilder.getResponse();
    },
    'AMAZON.PreviousIntent': async function (input: HandlerInput): Promise<Response> {
        return this['AMAZON.PreviousIntent'](input);
    },
    'CaracterOnlyIntent': async function (input: HandlerInput): Promise<Response> {
        return this['CaracterSoundsIntent'](input);
    },
    'CaracterSoundsIntent': async function (input: HandlerInput): Promise<Response> {
        console.log('CaracterSoundsIntent');
        const p = new Plateform(input);
        playCaracterSound(p);
        return input.responseBuilder.getResponse();
    },
    'SessionEndedRequest': async function (input: HandlerInput): Promise<Response> {
        console.log('SessionEndedRequest');
        // No session ended logic
        // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'System.ExceptionEncountered': async function (input: HandlerInput): Promise<Response> {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(input.requestEnvelope, null, 2));
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'Unhandled': async function (input: HandlerInput): Promise<Response> {
        console.log('Unhandled');
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
    },
    'AMAZON.RepeatIntent': async function (input: HandlerInput): Promise<any> {
        console.log('RepeatIntent');
        return Promise.resolve(input.responseBuilder.getResponse());

    },
    'AMAZON.FallbackIntent': async function (input: HandlerInput): Promise<Response> {
        console.log('FallbackIntent');
        return Promise.resolve(input.responseBuilder.getResponse());
    }
}