
export const configureHandler = (app) => {
    app.handle('WelcomeIntent', (conv) => {
        console.log('Kaamelott WelcomeIntent')
        conv.add('Salut depuis Home Kaamelott')
    });
}
