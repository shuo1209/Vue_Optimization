// webpack打包工具
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") 
// 生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 引入文件的方法
function resolve(dir) {
    return path.join(_dirname,dir)
}

module.exports = {
    // 基本路径,原先是baseurl,现在使用public代替
    publicPath: "./", 
    // 输出文件目录
    outputDir: 'dist',
    // 放置生成的静态资源(js、 css、 img、fonts)的(相对于 outputDir的目录)
    // assetsDir: './',
    // 指定生成的 index.html的输出路径(相对于 outputDir).也可以是一个绝对路径
    // indexPath: './',
    // eslint-loader是否保存时检查
    lintOnSave:true,
    devServer:{
        // 开启压缩
        compress: false,
        proxy: {
            '/apply': {
                target: 'http://www.study.com', //需要代理的服务器
                ws: true,                       //websocket与后台形成一个通道 持续的
                changeOrigin: true,             //是否荀彧跨域
                pathRewrite: {                  //重写
                    '/apply':'/'
                }
            }
        }
    },
    // Css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // sourceMaps是什么(主要是方便开发按人员的错误定位) 若果为true打包时间将会大幅度加长
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                data:`
                    @import "@/assets/common/index.css";
                `
            }
        },
        // 启动css modules for all css / pre-processor files.
        modules: false,
    },
    // webpack配置
    chainWebpack: config => {
        // 配置别名 不配置会报错
        config.resolve.alias
            .set("@",resolve("src"))
            .set("@img", reslove("src/assets/img"));
        // 生产环境配置
        if(isProduction){
            // 删除预加载
            config.plugins.delete('preload');
            conifg.plugins.delete('prefetch');
            // 压缩代码
            conifg.optimization.minimize(true);
            // 分割代码
            config.optimization.splitChunks({
                chunks: 'all'
            })
            // 生产环境注入cdn
        }
    },
    configureWebpack: config => {
        if(isProduction){
            // 用cdn方式引入

            // 为生产环境修改配置...
            config.plugins.push(
                // 为生产环境自动删除console
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            // warings: false,
                            drop_debugger: true,
                            drop_console: true,
                        }
                    },
                    // 是否生成sourceMap
                    sourceMap: false,
                    // 使用多进程并行运行来提高构建速度
                    parallel: true
                })
            );
        }else{
            // 为开发环境修改配置
            // 也可以为测试环境配置
        }
    },
    // 生产环境是否生成sourceMap
    productionSourceMap: false,
    // 启用并优化，默认并发运行数('os').cpus().length - 1 显著加速构建
    parallel: require('os').cpus().length -1,



}



// 注释详解
module.exports = {
    // 部署应用时的基本 URL
    baseUrl: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',
    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    // 构建多页面应用，页面的配置
    pages: {
    index: {
    // page 的入口
    entry: 'src/index/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Index Page',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`，并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
    },
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    // Babel 显式转译列表
    transpileDependencies: [],
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: true,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
    
    crossorigin: '',
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    integrity: false,
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    configureWebpack: {},
    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    chainWebpack: () => { },
    // css的处理
    css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: { css: {}, less: {} }
    },
    // 所有 webpack-dev-server 的选项都支持
    devServer: {},
    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,
    // 向 PWA 插件传递选项
    pwa: {},
    // 可以用来传递任何第三方插件选项
    pluginOptions: {}
}