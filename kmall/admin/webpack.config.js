const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//1,引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	//指定环境
  mode:'development',
  // mode:'production',
  //入口,开始打包
  //单一入口
  // entry: './src/index.js',
  // entry: {main:'./src/index.js'},
  //多个入口
  // entry:{//多个入口对应多个出口
  //   index:'./src/index.js',
  //   about:'./src/about.js',
  //   content:'./src/content.js'
  // },
  entry:{//多个入口对应多个出口
    index:'./src/index.js'
  },
  //出口
  output: {
  	//文件名模板,入口分块
    // filename: 'bundle.js',
    //多个出口
    filename: '[name]-bundle.js',
    // filename: 'index.js',
    //指定输出参考根目录
    publicPath:"/",
    //输出文件的目标路径
    path: path.resolve(__dirname, 'dist')
  },
  //配置别名
  resolve:{
      alias:{
          pages:path.resolve(__dirname,'./src/pages'),
          util:path.resolve(__dirname,'./src/util'),
          common:path.resolve(__dirname,'./src/common'),
          api:path.resolve(__dirname,'./src/api'),
      }
  },
  module: {
    rules: [
    //处理css文件
      /*{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },*/
      //2.修改loader配置
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
              }
            },
            "css-loader"
          ]
        },
      //处理图片
      {
    		test: /\.(png|jpg|gif)$/i,
    		use: [
    	  		{
    	    		loader: 'url-loader',
    	    			options: {
    	      			limit: 400//图片大小超过limit时会额外生成一个文件
    	    		}
    	  		}
    		]
    		},
        {
          test:/\.js$/,
          exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',
              options: {
                  // presets: ['env', 'react'],
                  presets: ['env','es2015','react','stage-3'],
                  plugins: [["import",{ "libraryName":"antd","libraryDirectory":"es","style":true }]]
              }
          }               
        },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader', // translates CSS into CommonJS
        }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            },
        }],
    }     	
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
        template:'./src/index.html',//模板文件
        filename:'index.html',//输出的文件名
        // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
        hash:true//给生成的js/css文件添加一个唯一的hash
    }),
    //3.修改插件配置
    new MiniCssExtractPlugin({})
  ],
  devServer:{
    contentBase: './dist',//内容的目录
    port:3001,//服务运行的端口
    historyApiFallback:true
  }
}