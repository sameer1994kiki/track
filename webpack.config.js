const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


const plugins = [];
if (process.env.NODE_ENV == "development") {
	plugins.push(new HtmlWebpackPlugin({
		inject: 'head',
		hash: true,
		template: path.join(__dirname, 'index.html'),
		filename: 'index.html',
	}))
}


module.exports = {
	entry: {
		'index': './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, './lib'),
		filename: "[name].js",
		libraryTarget: 'umd',//输出规范
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [{ loader: "babel-loader" }],
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		progress: true,
		inline: true
	},
	plugins: plugins,
	// devtool: "cheap-module-eval-source-map",
};