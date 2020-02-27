const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devProxyConfig = require('./src/common/proxy').proxy

function isBuild(){
    return process.env.NODE_ENV=="production";
}

function isDev(){
    return process.env.NODE_ENV=="development";
}

function assetsPath(_path) {
    return path.posix.join('assets', _path)
}

/**
 * 区分使用chunkhash、hash
 * chunkhash、会计算文件内容、判断是否生成新的hash、增加编译时间
 * @param {String} type 文件类型
 * @returns {*}
 */
function fileName(type) {
    if (process.env.NODE_ENV === 'production') {
        if (type == "css") {
            return 'modules/styles/[name].[chunkhash].css';
        }
        return 'modules/[name].[chunkhash].js';
    } else {
        if (type == "css") {
            return 'modules/styles/[name].[hash].css';
        }
        return 'modules/[name].[hash].js';
    }
}


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


function lessLoader(){
    if(isDev()){
        return ['style-loader','css-loader','less-loader']
    }else{
        return  ExtractTextPlugin.extract({
            fallback: 'style-loader',
            publicPath: "../../",
            use: 'css-loader!less-loader'
        })
    }
}

var config={
    entry: {
        //loader:'react-hot-loader/patch',
        app:  ['babel-polyfill',"./src/main.jsx"],
        //新增vendor包chunk、便于独立打包
        vendor: ['react','react-dom','react-router','react-router-dom','antd','react-redux','redux','redux-saga','axios']
    },
    output: {
        filename: fileName(),
        path: path.resolve(__dirname, 'build')
    },
//    devtool: 'cheap-module-eval-source-map',
    devtool: isBuild() ? false: 'source-map',
    devServer: {
        contentBase: './build',
        port: 7777,
        host: 'localhost',
        hot:true,
        proxy: devProxyConfig,
        open: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it‘s native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
                //开启缓存优化
                loader: 'babel-loader?cacheDirectory=true',
            }],
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            //用插件抽取css独立打包、配置打包输出路径
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                publicPath: "../../",
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            use: lessLoader()
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name: assetsPath('images/[name].[ext]')
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                name: assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor'],
            minChunks: 3
        }),
        new HtmlWebpackPlugin({
            title:"交银康联数据监控系统",
            filename: "index.html",
            chunks:['app','vendor'],
            template: "./src/template.html"
        }),
        new ExtractTextPlugin(fileName("css"))
    ]
}

// if(isDev()){
//     config.plugins=config.plugins.concat([
//         new WebpackBrowserPlugin()
//     ])
// }

if(isBuild()){
    config.plugins=config.plugins.concat([
        new CleanWebpackPlugin(['build']),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            sourceMap: true,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句、还可以兼容ie浏览器
                drop_console: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new CopyWebpackPlugin([ 
        //     { from: path.join(__dirname,'src/print.html'), 
        //         to:  path.join(__dirname,'build/') 
        //     }
        // ])   
    ])
}

module.exports = config;
