const functions = require('firebase-functions');

import { SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { IntentHandler } from './IntentHandler';
import { CustomRequestHandler } from './RequestHandler';


export const skillHandler = async (request, response) => {
    console.log('------ skill handler start here ------');
    const factory = SkillBuilders.standard()
        .addRequestHandlers(
            CustomRequestHandler.builder()
                .withHandlers(IntentHandler)
                .build()
        )//.addErrorHandlers(CustomErrorHandler)
        //.addResponseInterceptors(LastResponseSavingResponseInterceptor);


    const skill = factory.create();

    try {

        console.log('Will invoke skill')
        const responseEnvelope: ResponseEnvelope = await skill.invoke(request.body);
        
        console.log('invoked skill')
        console.log(JSON.stringify(responseEnvelope, null, 2));

        response.send(responseEnvelope);

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        response.send({error: "Error happened"});

    }
};
