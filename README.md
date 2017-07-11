# webpack
this repository used webpack study
#### 6.20文档主要是webpack使用htmlWebpackPlugin插件来实现一些功能
1. entry,output的设置
2. 压缩HTML文件
``` javascript
	new htmlWebpackPlugin({
		minify: {
			collapseWhitespace:true,
			removeComments:true
		}
	})
```
3. 如何将带有publicPath路径的script中的代码引入到head中的inline行内？

```javascript
<script type="text/javascript" src='<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>'></script>
```
#### webpack的基础应用
1.htmlWebpackPlugin插件的使用

2.style-loader,css-loader,postcss-loader的使用

3.es6语法的编译的时间过长？<br>通过设置的loader中的exclude和include来设置要编译的文件夹，对于那些没有必要编译的文件就没有必要扫描了。<br>
4.配置编译es6的loader:
* cnpm install --save babel-loader babel-core
* 配置.babelrc<br>
```javascript
	{
		"presets":["es2015"]
	}
```
5. 当需要引入绝对路径的时候，应该是commonJS的require方法。
```javascript
	#cnpm install --save babel-preset-es2015
```
6.对于串联的loader来说,读取或者是编译的顺序是从右向左.

7.postcss-loader的使用方法：
```javascript
module.exports = {
	module: {
		rules:[
			{
				test:/\.less$/,
				use:['style-loader','css-loader','postcss-loader','less-loader']
			}
		]
	}
}
```
注意：postcss-loader的配置：
需要的主目录或者css所在的目录下创建配置文件(命名为：postcss.config.js)：
```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ["last 5 versions"]
        })
    ]
}
```
8.主配置文件如下：
```javascript
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var path = require('path');
module.exports = {
	entry:'./src/app.js',
	output: {
		path:__dirname+'/dist',
		filename:'js/[name].bundle.js'

	},
	plugins:[
		new htmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:'body'
		})
	],
	devtool:'source-map',
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:path.resolve(__dirname,'/node_modules/'),
				include:path.resolve(__dirname,'src'),
				loader:'babel-loader'
			}
		],

		rules: [
			{
				test:/\.css$/,
				use: [
					    'style-loader',
					    {
					        loader: 'css-loader',
					        options: {
					            importLoaders: 1
					        }
					    },					                     
					    {
					        loader: 'postcss-loader'
					    }
					]
			},
			{
				test:/\.less$/,
				use:['style-loader','css-loader','postcss-loader','less-loader']
			},
			{
				test:/\.html$/,
				use:['html-loader']
			},
			{
				test:/\.tpl$/,
				use:['ejs-loader']
			},
			{
				test:/\.(jpg|png|gif)$/,
				use:[
						{
							loader:'url-loader',
							query:{
								name:'[name]-[hash:5].[ext]',
								outputPath:'assets/',
								limit:10000
							}
						},
						{
							loader:'image-webpack-loader',
							query: {
								  // progressive: true,
						    //       optimizationLevel: 7,
						    //       interlaced: false,
						    //       pngquant: {
						    //         quality: '65-90',
						    //         speed: 4
						          // }
							}
						}
				]
			}

		]

	}

}
```
8.vue-shopping项目是一个使用vuejs + resource.js构成的一个购物车实例，所采用的数据来自本地的JSON。
