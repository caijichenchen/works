require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = {
	productsListPrarms:{
        category:_util.getParamFromUrl('categoryId'),//分类
        keyword:_util.getParamFromUrl('keyword'),//关键字
        page:_util.getParamFromUrl('page') || 1,//页码
        orderBy:_util.getParamFromUrl('orderBy') || 'default',//排序
    }, 
	init:function(){
		this.initPagination()
		this.bindEvent()
		this.loadProductList()
	},
	bindEvent:function(){
		var _this = this
		//处理排序
		$('.sort-item').on('click',function(){
			var $this = $(this)
			//点击默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return
				}
				//显示选中
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active')
				//更改默认排序
				_this.productsListPrarms.orderBy = 'default'
			}
			//点击价格排序
			else if($this.hasClass('price')){
				//显示选中
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active')
				//根据价格选择升序降序
				if($this.hasClass('asc')){
					$this.removeClass('asc')
                    .addClass('desc')
                    _this.productsListPrarms.orderBy = 'price_desc'
				}else if($this.hasClass('desc')){
					$this.removeClass('desc')
                    .addClass('asc')
                    _this.productsListPrarms.orderBy = 'price_asc'   
				}
			}
			_this.productsListPrarms.page = 1
            _this.loadProductList()  
		})
	},
	initPagination:function(){
		var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.productsListPrarms.page = page
            _this.loadProductList()
        })
        //初始化分页组件
        this.$pagination.pagination()
	},
	loadProductList:function(){
		var _this = this
		api.getProductsList({
			data:this.productsListPrarms,
			success:function(result){
				console.log("result::",result);
				if(result.list.length > 0){
					var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.product-list-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
				}else{
					$('.product-list-box').html('<p class="empty-message">您找的商品去火星了!</p>')
				}
			}
		})
	}
}


$(function() {
    page.init()
})