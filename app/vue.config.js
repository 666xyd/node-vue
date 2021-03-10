module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */

    // 项目部署的基础路径

    // 我们默认假设你的应用将会部署在域名的根部,

    // 例如 https://www.my-app.com/

    // 如果你的应用部署在一个子路径下，那么你需要在这里

    // 指定子路径。比如将你的应用部署在

    // https://www.foobar.com/my-app/

    // 那么将这个值改为 '/my-app/'


    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）

        // 也可以是传递给 extract-text-webpack-plugin 的选项对象

        extract: true, // 允许生成 CSS source maps?

        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

        modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {}, // configure webpack-dev-server behavior

    devServer: {
        open: process.platform === "darwin",

        disableHostCheck: false,

        host: "0.0.0.0",

        port: 8081,

        https: false,

        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy

        proxy: null // string | Object

        // before: app => {}
    }, // 第三方插件配置

    pluginOptions: {
        // ...
    }
};