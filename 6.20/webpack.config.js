var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry:{
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/b.js',
		c:'./src/script/c.js'
	},
	output: {
		path:__dirname+'/dist',
		filename:'js/[name]-[chunkhash].js',
		publicPath:'http://xiaozhu/'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename:'a.html',
			template:'index.html',
			title:'this is a html',
			inject:false,
			excludeChunks:['b','c']
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			template:'index.html',
			title:'this is b html',
			inject:false,
			excludeChunks:['a','c']
		}),
		new htmlWebpackPlugin({
			filename:'c.html',
			template:'index.html',
			title:'this is c html',
			inject:false,
			excludeChunks:['a','b']
		}),
	]
}