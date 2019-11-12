let webpackCfg = require("./webpack.config.base");
let pkg = require('./package.json');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path');

// 路径
let srcPath = path.join(__dirname, './src')
let entryPath = path.join(srcPath, 'entrys'); // 入口脚本路径
let componentPath = path.join(srcPath, 'components'); // 业务组件路径

// 覆盖 antd-mobile 的变量
let antdModify = require(path.join(srcPath, 'styles', 'antdModify'));

// 环境域名
let __URL_HOST__ = process.env.GULP_ENV === "prod" ? "web.linkmsg.net:8081" : "web.linkmsg.net:8081";

// mini-css-extract-plugin 配置
let cssExtractLoader = pkg.assetExtractCss ? MiniCssExtractPlugin.loader : {
  loader: 'style-loader'
};


let config = webpackCfg.getConfig({
  // 版本号，默认1.0.0
  version: pkg.version,
  // 环境变量：dev,test,prod。默认test
  env: process.env.NODE_ENV === 'development' ? "dev" : process.env.GULP_ENV,
  // 需要提取的公共依赖
  extractBundle: {
    commonBundle: [
      'commons/base', 'commons/util', 'commons/device', 'commons/config'
    ],
    reactBundle: ['react', 'react-dom'],
  },
  // 后端接口路径
  rpcPath: {
    h5: `//${process.env.GULP_ENV == "prod" ? "weixin.linkmsg.net" : "weixin.linkmsg.net"}`
  },
  // 测试和生产环境配置
  dev: {
    devServer: {
      port: 8081
    }
  },
  prod: {
    // 替换资源路径
    // assetPath: `//${__URL_HOST__}/${pkg.deploy.cdnDir}/${pkg.version}/assets/`
    assetPath: `//${__URL_HOST__}/${pkg.version}/assets/`

  },
  // 模块索引规则
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      api: path.join(srcPath, 'api'),
      commons: path.join(srcPath, 'commons'),
      components: path.join(srcPath, 'components'),
      images: path.join(srcPath, 'images'),
      styles: path.join(srcPath, 'styles'),
      views: path.join(srcPath, 'views'),
      reducers: path.join(srcPath, "reducers"),
    }
  },
  // loaders
  loaders: [
    {
      // 非 antd-mobile 正常处理
      test: function (absPath) {
        return (/\.less$/).test(absPath)
          && !antdModify.isAntdPath(absPath);
      },
      // 指定目录启用 CSS Modules
      include: [
        entryPath
      ],
      use: [
        cssExtractLoader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, './postcss.config.js')
            }
          },
        },
        {
        loader: 'less-loader',
            options: {javascriptEnabled: true}
          },
        
      ]
    },
    {
      // 非 antd-mobile 正常处理
      test: function (absPath) {
        return (/\.less$/).test(absPath)
          && !antdModify.isAntdPath(absPath);
      },
      // 非指定目录正常处理
      exclude: [
        entryPath
      ],
      use: [
        cssExtractLoader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      // 覆盖 antd-mobile 变量
      test: function (absPath) {
        return (/\.less$/).test(absPath)
          && antdModify.isAntdPath(absPath);
      },
      use: [
        cssExtractLoader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            modifyVars: antdModify.lessQuery.modifyVars,
            javascriptEnabled: true
          }
        }
      ]
    },
  ],
  // script加跨域头
  alterAssetTags: false
})
console.log(config)
debugger
// 导出配置
module.exports = config;