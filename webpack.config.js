const path = require('path');
const paths = {
    src : path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    demo: path.resolve(__dirname, 'demo')
};

// const hash_len = 6;

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    devtool  : "source-map",
    entry    : {
        "vue-month-pickr.min": paths.src + '/index.js',
        "demo"               : paths.demo + '/index.js',
    },
    output   : {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
    },
    devServer: {
        contentBase: paths.demo,
        // compress: true
    },
    module   : {
        rules: [
            // html
            {
                test: /\.html$/,
                use : [
                    {
                        loader: "html-loader",
                        // options: { minimize: true }
                    }
                ]
            },
            // js
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : {
                    loader: "babel-loader"
                }
            },
            // scss
            {
                test: /\.s?[ac]ss$/,
                use : [
                    // process.env.NODE_ENV !== 'production'
                    //     ? 'vue-style-loader'
                    //     : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                        options: {
                            minimize : true,
                            sourceMap: true
                        },
                    },
                    {
                        loader : 'postcss-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader : 'sass-loader',
                        options: {
                            minimize : true,
                            sourceMap: true
                        },
                    },
                ]
            },
            // vue
            {
                test: /\.vue$/,
                // exclude: /node_modules/,
                use : 'vue-loader',
            },
            // icons/images
            {
                test   : /\.(png|gif|jpe?g|svg)$/,
                include: path.resolve(paths.src, 'images'),
                use    : [
                    {
                        loader : 'file-loader',
                        options: {
                            name      : `[name].[ext]`,
                            outputPath: 'images'
                        },

                    },
                ]
            },
            // fonts
            {
                test   : /\.(woff|woff2|eot|ttf|otf|svg)$/,
                include: path.resolve(paths.src, 'fonts'),
                use    : [
                    {
                        loader : 'file-loader',
                        options: {
                            name      : `[name].[ext]`,
                            outputPath: 'fonts'
                        }
                    },
                ]
            }
        ]
    },
    plugins  : [
        // clean dist
        new CleanWebpackPlugin(paths.dist),

        new VueLoaderPlugin(),

        new HtmlWebPackPlugin({
            template: path.resolve(paths.demo, 'index.html'),
            // favicon: path.resolve(paths.src, 'favicon.ico'),
            chunks  : ['demo'],
            minify  : {
                collapseWhitespace: true
            }
        }),

        new MiniCssExtractPlugin({
            filename     : "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};