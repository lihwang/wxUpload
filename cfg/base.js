let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 基本参数
let baseOption = {}

// html插件chunks
let HtmlWebpackPluginChunks = null;

// 初始化
let init = function (options) {
    baseOption = options;
    HtmlWebpackPluginChunks = Object.keys(baseOption.extractBundle);
}

// 页面列表
let entryPages = () => {
    let pattern = path.join(baseOption.pagePath, '*.html');
    let pages = [];
    glob.sync(pattern).forEach(function (fullFileName) {
        let name = path.parse(fullFileName).name;
        pages.push(name);
    });
    return pages;
}

// 入口
let entry = () => {
    let entry = Object.assign({}, baseOption.extractBundle);
    let pages = entryPages();
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        entry[page] = path.join(baseOption.entryPath, page);
    }
    return entry;
}

// 获取模板插件
let getHtmlWebpackPlugins = () => {
    let plugins = [];
    let pages = entryPages();
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        // chunks
        let chunksArray = HtmlWebpackPluginChunks.slice(0)
        chunksArray.push(page);
        // new plugin
        plugins.push(new HtmlWebpackPlugin({
            template: path.join(baseOption.pagePath, `${page}.html`),
            filename: path.join(baseOption.distPath, `${page}.html`),
            chunks: chunksArray,
            alterAssetTags: (htmlPluginData) => { // 为插入的标签添加 crossorigin 属性，允许跨域脚本提供详细错误信息。
                if (baseOption.alterAssetTags) {
                    let assetTags = [].concat(htmlPluginData.head).concat(htmlPluginData.body);
                    assetTags.forEach((assetTag) => {
                        if (assetTag.tagName == 'script' || assetTag.tagName == 'link') {
                            assetTag.attributes.crossorigin = 'anonymous';
                        }
                    });
                }

                return htmlPluginData;
            }
            // alwaysWriteToDisk: true
        }))
    }
    return plugins;
};

// 获取加载器
let getLoaders = () => {
    return [
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader?interpolate&minimize=false&attrs=script:src link:href img:src a:href'
                }
            ]
        },
        {
            test: /\.(ico|mp4|ogg|svg|eot|otf|ttf|woff|woff2)$/,
            loader: 'file-loader'
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader?cacheDirectory',
            include: baseOption.srcPath
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                name: '[name][hash:base64:5].[ext]',
                limit: 4096
            }
        }
    ]
}

// 获取插件
let getPlugins = () => {
    let plugins = getHtmlWebpackPlugins();
    plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css?t=[hash]",
            chunkFilename: "[name].css",
        }),
        new webpack.HotModuleReplacementPlugin()
    )
    return plugins;
}

// 基本配置项
let getConfig = () => {
    return {
        entry: entry(),
        externals: baseOption.externals,
        resolve: baseOption.resolve,
        module: {
            rules: getLoaders().concat(baseOption.loaders)
        },
        plugins: getPlugins(),
        optimization: {
            runtimeChunk: {//老版本未更改hash变化解决
                name: 'runtime'
            },
            usedExports: true,//要做排除的去sideEffects设置
            splitChunks: {
                chunks: "all",//异步同步全部
                automaticNameDelimiter: '~',
                automaticNameMaxLength: 2,
                name: true,
                cacheGroups: {//满足后分割位置 
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, //都符合和情况默认放到的优先级里
                        name: 'vendors'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        name: 'default'
                      }
                }
            }
        },
    }
}

module.exports = {
    // getDefinePluginParam: getDefinePluginParam,
    // getPublicPageFullname: getPublicPageFullname,
    // baseOption: baseOption,
    // getPlugins: getPlugins,

    init,
    entryPages,
    getConfig
}