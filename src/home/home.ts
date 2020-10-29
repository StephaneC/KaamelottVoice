import { configureHandler } from "./IntentHandler";
import { conversation } from '@assistant/conversation';

const app = conversation()

// Create an app instance
configureHandler(app);

export const handler = app;