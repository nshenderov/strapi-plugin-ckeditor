module.exports = [
    {
        method: 'GET',
        path: '/config/:configKey',
        handler: 'config.getConfig',
        config: {policies: []},
    },
    {
        method: 'GET',
        path: '/editor-config-script.js',
        handler: 'config.getEditorConfigScript',
        config: {
            auth: false // Assume CKEditor config is not sensitive. We can't send a JWT token in a static script tag.
        },
    }
];
