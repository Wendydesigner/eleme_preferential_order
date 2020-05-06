const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["awesome-typescript-loader"]
            },
            {
                test: /\.js$/,
                use: ["source-map-loader", "babel-loader"],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}