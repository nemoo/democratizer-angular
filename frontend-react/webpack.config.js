module.exports = {
    entry: "./app/index.jsx",

    output: {
        path: "../server/public/js",
        filename: "Bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:
                {
                   presets:['es2015', 'react']
                }
            }
        ]
    }
};