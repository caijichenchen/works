;(function($){
	//1.登陆切换注册面板
	var $register = $('#register');
	var $login = $('#login');
	//1.1.从登陆面板切换到注册面板
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	})
	//1.2.从注册面板到登陆面板
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})
	//正则(3-10以字母开头，包含数字下划线)
	var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i;
	var passwordReg = /^\w{3,6}$/;
	//2.注册
	$('#sub-register').on('click',function(){
		//1.获取表单数据
		var username = $register.find('[name=username]').val();
		var password = $register.find('[name=password]').val();
		var repassword = $register.find('[name=repassword]').val();
		//2.验证
		var errMsg = '';
		var $err = $register.find('.err');
		if(!usernameReg.test(username)){
			errMsg = "用户名必须是3-10位以字母开头,数字字母下划线结束";
		}
		else if(!passwordReg.test(password)){
			errMsg = "密码必须是3-6位,字母数字结束";
		}
		else if(password != repassword){
			errMsg = "两次输入密码不一致";
		}
		//验证信息不通过
		if(errMsg){
			$err.html(errMsg);
			return
		}
		else{//验证通过
			$err.html('');
			//3.发送ajax请求
			$.ajax({
				url:'/user/register',
				type:"POST",
				dateType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status == 200){
					$('#go-login').trigger('click');
				}else{
					$err.html(result.message);
				}
			})
			.fail(function(err){
				$err.html("请求失败...")
			})
		}
	})
	//3.登陆
	$('#sub-login').on('click',function(){
		//1.获取表单数据
		var username = $login.find('[name=username]').val();
		var password = $login.find('[name=password]').val();
		//2.验证
		var errMsg = '';
		var $err = $login.find('.err');
		if(!usernameReg.test(username)){
			errMsg = "用户名必须是3-10位以字母开头,数字字母下划线结束";
		}
		else if(!passwordReg.test(password)){
			errMsg = "密码必须是3-6位,字母数字结束";
		}
		//验证信息不通过
		if(errMsg){
			$err.html(errMsg);
			return
		}
		else{//验证通过
			$err.html('');
			//3.发送ajax请求
			$.ajax({
				url:'/user/login',
				type:"POST",
				dateType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				// console.log(result);
				if(result.status == 200){
					/*
					$login.hide();
					$('#user-info').show();
					$('#user-info span').html(result.data.username);
					*/
					window.location.reload();
				}else{
					$err.html(result.message);
				}
			})
			.fail(function(err){
				$err.html("请求失败...")
			})
		}
	})
	//4.退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout'
		})
		.done(function(result){
			window.location.href = '/';
		})
		.fail(function(err){
			$('#user-info .err').html("请求失败,请稍后重试");
		})
	})
	//5.处理文章分页
	var $articlePage = $('#article-page');
	function buildArticleHtml(articles){
		var html = '';
		articles.forEach(function(article){
			html += `
			<div class="panel panel-default content-item">
			    <div class="panel-heading">
			      <h3 class="panel-title">
			        <a href="/detail/${ article._id.toString() }" class="link" target="_blank">${ article.title }</a>
			      </h3>
			    </div>
			    <div class="panel-body">
			      ${ article.intro }
			    </div>
			    <div class="panel-footer">
			      <span class="glyphicon glyphicon-user"></span>
			      <span class="panel-footer-text text-muted">${ article.user.username }</span>
			      <span class="glyphicon glyphicon-th-list"></span>
			      <span class="panel-footer-text text-muted">${ article.category.name }</span>
			      <span class="glyphicon glyphicon-time"></span>
			      <span class="panel-footer-text text-muted">${ article.createdTime }</span>
			      <span class="glyphicon glyphicon-eye-open"></span>
			      <span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
			    </div>
			</div>
			`
		})
		return html
	}
	function buildPaginationHtml(page,pages,list){
		var html = '';
		if(page == 1){
			html += `<li class="disabled">`;
		}else{
			html += `<li>`;
		}
		html += `<a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>`
      	list.forEach(function(i){
      		if(i == page){
      			html += `<li class="active"><a href="javascript:;">${i}</a></li>`
      		}else{
      			html += `<li><a href="javascript:;">${i}</a></li>`
      		}
      	})
    	if(page == pages){
    		html += `<li class="disabled">`
    	}else{
    		html += `<li>`
    	}
    	html += `<a href="javascript:;" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			     </a>
			    </li>`   
		return html
	}
	$articlePage.on('get-data',function(ev,data){
		$('#article-wrap').html(buildArticleHtml(data.docs));
		//构建分页器
		if(data.pages > 1){
			$('.pagination').html(buildPaginationHtml(data.page,data.pages,data.list));
		}else{
			$('.pagination').html('');
		}
	})
	$articlePage.pagination({
		url:'/articles'
	})
	//处理文章评论分页
	var $commentPage = $('#comment-page');
	function buildCommentHtml(comments){
		var html = '';
		comments.forEach(function(comment){
			html += `<div class="panel panel-default">
        <div class="panel-heading">${ comment.user.username } 发表于 ${ comment.createdTime } </div>
        <div class="panel-body">
          ${ comment.content }
        </div>
      </div>`
		})
		return html;
	}
	$commentPage.on('get-data',function(ev,data){
		console.log(data);
		$('#comment-wrap').html(buildCommentHtml(data.docs));
		//构建分页器
		if(data.pages > 1){
			$('.pagination').html(buildPaginationHtml(data.page,data.pages,data.list));
		}else{
			$('.pagination').html('');
		}
	})
	$commentPage.pagination({
		url:'/comment/list'
	})
})(jQuery);