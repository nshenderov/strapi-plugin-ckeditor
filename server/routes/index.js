module.exports = [
    {
        method: 'GET',
        path: '/config/:configKey',
        handler: 'config.getConfig',
        config: {policies: []},
    },
    {
        method: 'GET',
        path: '/editor-config-script',
        handler: 'config.getEditorConfigScript',
        config: {
            policies: [() => true] // public
        },
    }
];
