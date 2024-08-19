module.exports = [
    {
        method: 'GET',
        path: '/config/upload',
        handler: 'config.getUploadConfig',
        config: {
            auth: false
        },
    },
    {
        method: 'GET',
        path: '/ckeditor-config',
        handler: 'config.getCKEditorConfig',
        config: {
            auth: false
        },
    }
];
