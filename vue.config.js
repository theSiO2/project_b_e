module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',

        },

    },
    lintOnSave: false,      //关闭语法检查
    devServer: {
        disableHostCheck: false,
        host: "0.0.0.0",
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: null
    },
    //开启代理服务器(方式1)
    // devServer: {
    //     proxy: 'http://localhost:5000'
    //   },

    //开启代理服务器(方式2)
    // devServer: {
    //     proxy: {
    //         //有'/api'的前缀（在网址端口号后面）的网址走代理服务器，没有前缀不走代理
    //         '/api': {
    //             target: 'http://localhost:5000',//服务器的基础地址
    //             ws: true,//用于支持websocket
    //             changeOrigin: true,//控制请求头中的host值是否隐藏信息
    //             pathRewrite:{'^/api':''}//正则表达式，用于替换网址的文本（将前缀从网址中去除）
    //         },
    //         //支持多个的代理服务器
    //         '/demo': {
    //             target: 'http://localhost:5001',//服务器的基础地址
    //             ws: true,//用于支持websocket
    //             changeOrigin: false,//控制请求头中的host值是否隐藏信息
    //             pathRewrite:{'^/demo':''}
    //         },
    //     }
    // }
}