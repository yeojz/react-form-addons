var path = require('path');

module.exports = {
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.md$/,
            loaders: ['html', 'markdown']
        }, {
            test: /\.json$/,
            loaders: ['json']
        }]
    },
    resolve: {
        root: path.resolve(__dirname, '..'),
        extensions: ['', '.jsx', '.js', '.scss', '.css', '.json'],
        modulesDirectories: ['node_modules']
    }
}
