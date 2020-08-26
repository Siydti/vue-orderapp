import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'

export var ipurl = 'http://127.0.0.1:5000/upload/shop/'

//1.获取商品数据  
export var goods_list = () => axios.get( '/goods/goods_list' )

//2.获取商家
export var seller = () => axios.get( '/shop/seller' )

//3.获取评价数据
export var ratings = () => axios.get( '/shop/ratings' )