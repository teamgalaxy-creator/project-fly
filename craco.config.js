const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '~components': path.resolve(__dirname, 'src/components'),
            '~containers': path.resolve(__dirname, 'src/containers'),
            '~redux': path.resolve(__dirname, 'src/redux'),
            '~models': path.resolve(__dirname, 'src/utility/models'),
            '~utility': path.resolve(__dirname, 'src/utility'),
            '~styles': path.resolve(__dirname, 'src/styles'),
            '~data': path.resolve(__dirname, 'src/data'),
            '~animation_engine': path.resolve(__dirname, 'src/animation_engine'),
        },
    },
};
