/**
 * Created by hb on 2018/6/20.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractSASS = new ExtractTextPlugin('css/[name]-sass.css');
//构建前删除dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 清理冗余的css npm i purifycss-webpack purify-css --save-dev
// const PurifyCssWebpack = require('purifycss-webpack');

module.exports = {
    entry: {
    	jquery: 'jquery',
        base: './src/js/base.js',
        index: './src/js/index.js',
        test: './src/js/test.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use:[
                        {loader:'css-loader'},
                        {loader:'postcss-loader'} //利用postcss-loader自动添加css前缀
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"},
                        {loader:'postcss-loader'} //利用postcss-loader自动添加css前缀
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true//缓存
                    }
                }
            },
            { //打包css里的图片
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,  //小于8KB,就base64编码
                            name: 'img/[name].[ext]',     //在哪里生成
                            publicPath: '../'    //在生成的文件引用,前面加
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',// 模板文件
                filename: 'index.html',
                chunks: ['jquery','base',"index"],
            }
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/test.html',// 模板文件
                filename: 'test.html',
                chunks: ['jquery','base',"test"],
            }
        ),
        new CopyWebpackPlugin([
            {from: './src/img', to: './img'}
        ]),
        extractCSS,
        extractSASS,
        new CleanWebpackPlugin(['dist', 'build'], {
            verbose: false,
            exclude: ['img']//不删除img静态资源
        })
        // new PurifyCssWebpack({ //消除冗余代码
            // 首先保证找路径不是异步的,所以这里用同步的方法
            // path.join()也是path里面的方法,主要用来合并路径的
            // 'src/*.html' 表示扫描每个html的css
        //    paths:glob.sync(path.join(__dirname,'src/*.html'))
        // })
    ]
}