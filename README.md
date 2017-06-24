# webpack
this repository used webpack study
# 6.20文档主要是webpack使用htmlWebpackPlugin插件来实现一些功能
1. entry,output的设置
2. 压缩HTML文件
`
	new htmlWebpackPlugin({
		minify: {
			collapseWhitespace:true,
			removeComments:true
		}
	})
`
3. 如何将带有publicPath路径的script中的代码引入到head中的inline行内？
`
<script type="text/javascript" src='<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>'></script>
`