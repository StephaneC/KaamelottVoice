import { configureHandler } from "./IntentHandler";
import { conversation } from '@assistant/conversation';
const functions = require('firebase-functions');

const app = conversation()

// Create an app instance
configureHandler(app);

export const handler = functions.https.onRequest(app)