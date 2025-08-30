import createNextIntlPlugin from 'next-intl/plugin';

export default createNextIntlPlugin({
    requestConfig: './src/i18n/request.ts',
    //routing: './src/i18n/routing.ts', // werkt pas op recente 4.x
})({});