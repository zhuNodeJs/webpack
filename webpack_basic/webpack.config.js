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