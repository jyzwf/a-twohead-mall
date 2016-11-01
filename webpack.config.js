var path = require('path');
var webpack = require('webpack');
var config = {
	entry:{
        './page/login/login':'./src/page/login/login.js',
        './page/register/register_step1':'./src/page/register/register_step1.js',
        './page/register/register_step2':'./src/page/register/register_step2.js',
        './page/forget_password/forget_pswd':'./src/page/forget_password/forget_pswd.js',
        './page/release/release':'./src/page/release/release.js',
        './page/search/search':'./src/page/search/search.js',
        './page/index/index':'./src/page/index/index.js',
        './page/shop_car/shopcar':'./src/page/shop_car/shopcar.js',
        './page/good_detail/detail':'./src/page/good_detail/detail.js',
        './page/buy_now/buy_now':'./src/page/buy_now/buy_now.js',
        './page/my_center/my_center':'./src/page/my_center/my_center.js',
        './page/confirm_stu/confirm_stu':'./src/page/confirm_stu/confirm_stu.js',
        './page/my_goods/my_goods':'./src/page/my_goods/my_goods.js',
        './page/my_orders/my_orders':'./src/page/my_orders/my_orders.js',
        './page/seller_orders/seller_orders':'./src/page/seller_orders/seller_orders.js',
        './page/my_focus/my_focus':'./src/page/my_focus/my_focus.js',
        './page/my_msg/my_msg':'./src/page/my_msg/my_msg.js',
        './page/order_detail/order_detail':'./src/page/order_detail/order_detail.js',
        './page/seller_page/sell_page':'./src/page/seller_page/sell_page.js',
        './page/classify_type/classify_type':'./src/page/classify_type/classify_type.js',
		'./page/bind_account/bind_account':'./src/page/bind_account/bind_account.js',

	},
	output:{
		filename:"./[name].js"
	},

    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},
            { test: /\.css$/, loader: 'style!css!autoprefixer!sass'},
        ]
    },
    resolve: {
      extensions: ['', '.vue', '.js','.css','.json']
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery',
            'window.jQuery' : 'jquery',
            moment : 'moment'
        }),
    ]
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}