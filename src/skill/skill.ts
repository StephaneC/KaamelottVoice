const functions = require('firebase-functions');

import { SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { AudioHandler } from './AudioHandler';
import { IntentHandler } from './IntentHandler';
import { CustomRequestHandler } from './RequestHandler';


export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<void> {
    console.log('------ skill handler start here ------');
    const factory = SkillBuilders.standard()
        .addRequestHandlers(
            CustomRequestHandler.builder()
                .withHandlers(IntentHandler)
                .withHandlers(AudioHandler)
                .build()
        )//.addErrorHandlers(CustomErrorHandler)
        //.addResponseInterceptors(LastResponseSavingResponseInterceptor);


    const skill = factory.create();

    try {

        console.log('Will invoke skill')
        const responseEnvelope: ResponseEnvelope = await skill.invoke(event, context);
        
        console.log('invoked skill')
        console.log(JSON.stringify(responseEnvelope, null, 2));

        return callback(null, responseEnvelope);

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        return callback(error);

    }
};
