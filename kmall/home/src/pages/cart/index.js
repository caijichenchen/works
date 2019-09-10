var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = { 
	init:function(){
		this.$elem = $('.cart .cart-box')
		this.loadCarts()
		this.bindEvent()
	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(cart){
				_this.renderCart(cart)
			},
			error:function(){
				_this.showErrorPage()
			}
		})
	},
	renderCart:function(cart){
		//重新加载购物车数量
		_nav.loadCartsCount()
		if(cart.cartList.length > 0){
			//缓存总价用来提交时验证
            this.totalCartPrice = cart.totalCartPrice
            var html = _util.render(tpl,cart)
            this.$elem.html(html)
        }else{
            this.$elem.html('<p class="empty-message">您的购物车空空如也!</p>') 
        }
	},
	showErrorPage:function(){
        this.$elem.html('<p class="empty-message">好像出错了,请稍后再试!</p>') 
    },
    bindEvent:function(){
		var _this = this
		//单选
		this.$elem.on('click','.select-one',function(){
			var $this = $(this)
			//拿到存储的商品id
			var productId = $this.parents('.product-item').data('product-id')
			//单选
			if($this.is(':checked')){
				api.updateCartsChoices({
					data:{
						productId:productId,
                        checked:true,
					},
					success:function(cart){
						_this.renderCart(cart)
					},
					error:function(){
                        _this.showErrorPage()
                    }
				})
			}
			//取消单选
			else{
				api.updateCartsChoices({
					data:{
						productId:productId,
                        checked:false,
					},
					success:function(cart){
						_this.renderCart(cart)
					},
					error:function(){
                        _this.showErrorPage()
                    }
				})
			}
		})
		//全选
		this.$elem.on('click','.select-all',function(){
			var $this = $(this)
			//单选
			if($this.is(':checked')){
				api.updateCartsChoices({
					data:{
                        checked:true,
					},
					success:function(cart){
						_this.renderCart(cart)
					},
					error:function(){
                        _this.showErrorPage()
                    }
				})
			}
			//取消单选
			else{
				api.updateCartsChoices({
					data:{
                        checked:false,
					},
					success:function(cart){
						_this.renderCart(cart)
					},
					error:function(){
                        _this.showErrorPage()
                    }
				})
			}
		})
		//删除单个
		this.$elem.on('click','.delete-one',function(){
			var $this = $(this)
			//拿到存储的商品id
			var productId = $this.parents('.product-item').data('product-id')
			//删除
			if(_util.showConfirm('您确认选择删除选中商品吗？')){
				api.deleteCarts({
					data:{
						productId:productId
					},
					success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
				})
			}
		})
		//删除多个
		this.$elem.on('click','.delete-selected',function(){
            if(_util.showConfirm("您确定要删除选中的商品吗?")){
                api.deleteCarts({
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }
        })
        //处理商品数量
        this.$elem.on('click','.count-btn',function(){
            var $this = $(this)
            var productId = $this.parents('.product-item').data('product-id')
            var $input = $this.siblings('.count-input')
            var current = parseInt($input.val())
            var stock = $input.data('stock')
            var count = current
            //减少
            if($this.hasClass('minus')){
                if(current == 1){
                    _util.showErrorMsg("商品最少选择一件")
                    return
                }
                count = current - 1
            }
            //增加
            else if($this.hasClass('plus')){
                if(current == stock){
                    _util.showErrorMsg("商品已经达到上限了")
                    return                    
                }
                count = current + 1
            }
            api.updateCartsCounts({
                data:{
                    productId:productId,
                    count:count,
                },
                success:function(cart){
                    _this.renderCart(cart)
                },
                error:function(){
                    _this.showErrorPage()
                }                
            })
        })
        //处理结算跳转
        this.$elem.on('click','.btn-submit',function(){
            if(_this.totalCartPrice > 0){
                window.location.href = "./order-confirm.html"
            }else{
                _util.showErrorMsg("请最少选择一件商品")
            }
        }) 
	},
}


$(function() {
    page.init()
})