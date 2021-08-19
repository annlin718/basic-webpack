const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // 属性名是打包后生成的js文件名，属性值是入口文件
        index: './index.js',
        a: './a.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[contenthash:10].js',
        //[ext] 副檔名
        assetModuleFilename: 'images/[name][hash:5][ext][query]'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    // target:兼容IE做處理
    target: ['web', 'es5'],
    module: {
        rules: [{
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    //將CSS獨立出來一個文件(取代style-loader)
                    MiniCssExtractPlugin.loader,
                    // Creates `style` nodes from JS strings
                    // "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    //Postcss 和 postcss-preset-env 將CSS 加入前綴詞
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions',
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                //加載圖片相關資源的loader
                test: /\.(png|jpg|gif)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024 // 5kb以下就用base64處理(不外連檔案)
                    },
                },
            },
            {
                test: /\.svg/,
                type: 'asset/inline'
            },
            {
                test: /\.html$/,
                //處理html文件的img圖片(負責引入img，從而能被url-loader進行處理)
                loader: 'html-loader',
                options: {
                    esModule: false,
                }
            }
        ],
    }, // plugins：使用的插件
    plugins: [
        // new HtmlWebpackPlugin({
        //     //複製src/html/index.html內的index.html文件，並自動打包引入輸出的所有資源boundle.js(CSS/JS)
        //     title: 'TEST',
        //     template: path.resolve(__dirname, "./src/html/index.html"),
        //     filename: 'index.html',
        //     viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        //     inject: 'head', //檔案插入位置(Head 或 Body)
        //     // chunks: ['index'],
        //     // minify: {
        //     //     //壓縮HTML檔案
        //     //     //移除空格
        //     //     collapseWhitespace: true,
        //     //     //移除註釋
        //     //     removeComments: true
        //     // }
        // }),
        new HtmlWebpackPlugin({
            chunks: ['index'], // 这个名字，就是入口定义的名字
            filename: 'index.html',
            hash: true,
            template: path.resolve(__dirname, "./src/html/index.html")
        }),
        new HtmlWebpackPlugin({
            chunks: ['a'], // 这个名字，就是入口定义的名字
            filename: 'a.html',
            hash: true,
            template: path.resolve(__dirname, "./src/html/a.html")
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/main.[contenthash:10].css",
            linkType: "text/css",
        })
    ],
    mode: "development",
    //souce-map：為一種提供原代碼到構建後代碼的關係技術（如果構建出錯了可追蹤原代碼錯誤）
    //開發環境下可用"eval-source-map"
    //生產環境下可用"source-map"
    //[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    devtool: 'eval-source-map'
};