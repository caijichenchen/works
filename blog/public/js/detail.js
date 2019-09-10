;(function($){
	$('.btn-sub-comment').on('click',function(){
		var val = $('#comment-content').val().trim();
		// alert(val)
		if(!val){
			$('.err').html('评论内容不能为空');
			return false
		}
		else if(val.length > 100){
			$('.err').html('评论字数最多不超过100');
			return false
		}
		else{
			$('.err').html('');
		}
		var id = $(this).data('id');
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				val:val,
				article:id
			}
		})
		.done(function(result){
			// console.log(result);
			if(result.status == 200){
				$('#comment-content').val('');
				$('#comment-page').trigger('get-data',result.data);
			}else{
				alert(result.message)
			}
		})
		.fail(function(err){
			alert("评论失败请重试")
		})
	})
})(jQuery)