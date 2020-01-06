const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api',
        {
            target: 'http://192.168.65.17:4002/',
            // target: 'http://192.168.65.107:4002/',
            changeOrigin: true,
            pathRewrite: {
                // '^/api/Archive/ArchiveData': '/Archive/ArchiveData',
            },
        }
    ));
};
