require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = {
	productsDetailPrarms:{
        id:_util.getParamFromUrl('productId')
    }, 
	init:function(){
		this.$elem = $('.detail-box')
		this.bindEvent()
		this.productsDetail()
	},
	bindEvent:function(){
		var _this = this
		//1.图片切换
		this.$elem.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			//小图片切换样式
			$this.addClass('active')
            .siblings('.product-small-img-item').removeClass('active')
            //大图切换地址
            var imgSrc = $this.find('img').attr('src')
            $('.product-main-img img').attr('src',imgSrc)
		})
		//购买数量逻辑
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $('.count-input')
			var current = parseInt($input.val())//数字化
			//增加
			if($this.hasClass('plus')){
				$input.val(current == _this.stock ? _this.stock : current+1)
			}
			//减少
			else if($this.hasClass('minus')){
				$input.val(current == 1 ? 1 : current-1)
			}
		})
		//添加购物车
		this.$elem.on('click','.add-cart-btn',function(){
			api.addCarts({
				data:{
					productId:_this.productsDetailPrarms.id,
                    count:$('.count-input').val()
				},
                success:function(){
                    _util.goResult('addCart')
                }
			})
		})
	},
	productsDetail:function(){
		if(!this.productsDetailPrarms.id){
            return
        }
        var _this = this
		api.getProductsDetail({
			data:this.productsDetailPrarms,
			success:function(product){
				console.log("product::",product);
				if(product){
					//存储库存数据
					_this.stock = product.stock
					product.images = product.images.split(',')
                    product.activeImage = product.images[0]
                    var html = _util.render(tpl,product)
                    _this.$elem.html(html)
				}
				else{
					_this.$elem.html('<p class="empty-message">您找的商品去火星了!</p>')
				}
			}
		})
	}
}


$(function() {
    page.init()
})