var path = require('path');

module.exports = {
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.md$/,
            loaders: ['html', 'markdown']
        }]
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.css'],
        modulesDirectories: ['node_modules']
    }
}
