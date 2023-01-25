module.exports = [
    {
        method: 'GET',
        path: '/config/upload',
        handler: 'config.getUploadConfig',
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
