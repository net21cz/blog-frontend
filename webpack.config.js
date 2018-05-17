const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        blog: './src/blog.js',
        article: './src/article.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'js')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'syntaxhighlighter': 'syntaxhighlighter',
        'bootstrap-css-only': 'bootstrap-css-only'
    },
    plugins: [
        new CleanWebpackPlugin([
                'dist'
        ]),
        new CopyWebpackPlugin([{
                from: '**/*',
                to: path.resolve(__dirname, 'dist'), context: 'resources/'
            }, {
                from: 'node_modules/vue/dist/vue.min.js',
                to: path.resolve(__dirname, 'dist/js')
            }, {
                from: 'node_modules/vuex/dist/vuex.min.js',
                to: path.resolve(__dirname, 'dist/js')
            }, {
                from: 'node_modules/bootstrap-css-only/css/bootstrap.min.css',
                to: path.resolve(__dirname, 'dist/css')
            }
        ])
    ]
}