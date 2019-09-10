;(function($){
	$.fn.extend({
		pagination:function(options){
			var $elem = this;
			$elem.on('click','a',function(){
				var $this = $(this);
				// console.log(this);
				//获取当前页,根据当前页计算请求页码
				//1.获取当前页
				var currentPage = $elem.find('.active a').html();
				//2.根据当前页码计算请求
				var labelText = $this.attr('aria-label');
				if(labelText == "Previous"){
					page = currentPage -1;
				}
				else if(labelText == "Next"){
					page = currentPage*1 +1;
				}
				else{
					page = $this.html();
				}
				//如果点击当前页不发送请求
				if(page == currentPage){
					return false
				}
				var url = options.url+"?page="+page;
				//获取到分类文章对应的id,点击分类按钮时显示还是对应的分类文章
                var id = $elem.data('id');
                if(id){//首页没有Id,显示全部文章
                    url = url + "&id="+id
                }
				$.ajax({
					url:url,
					dataType:"json"
				})
				.done(function(result){
					if(result.status == 200){
						$elem.trigger('get-data',result.data)
					}else{
						alert("请求失败请稍后重试")
					}
				})
				.fail(function(err){
					console.log(err);
					alert("请求失败请稍后重试")
				})
			})
		}
	})
})(jQuery);