module.exports = [
    {
        method: 'GET',
        path: '/config/upload',
        handler: 'config.getUploadConfig',
    },
    {
        method: 'GET',
        path: '/ckeditor-config.js',
        handler: 'config.getCKEditorConfig',
        config: {
            auth: false // Assume CKEditor config is not sensitive. We can't send a JWT token in a static script tag.
        },
    }
];
