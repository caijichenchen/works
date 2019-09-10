;(function(w){
	function kquery(msg){
		return new kquery.prototype.init(msg);
	}
	kquery.fn = kquery.prototype = {
		contstructor : kquery,
		init : function(msg){
			// 布尔值是fasle
			if(!msg){
				return this;
			}
			else if(kquery.isFunction(msg)){
				this[0]=document;
				this.context = document;
				this.length = 1;
				document.addEventListener('DomContentLoaded',msg);
				return this;
			}
			else if(kquery.isString(msg)){
				if(kquery.isHTML(msg)){
					var newDiv = document.createElement('div');
					newDiv.innerHTML = msg;
					for(var i = 0;i<newDiv.children.leng;i++){
						this[i]=newDiv.children[i];
					}
					this.length = newDiv.children.length;
				}else{
					var nav = document.querySelectorAll(msg);
					for(var i = 0;i<nav.length;i++){
						this[i]=nav[i];
					}
					this.length=nav.length;
				}
			}
			else if(kquery.isArray(msg)){
				for(var i = 0;i<msg.length;i++){
					this[i]=msg[i];
				}
				this.length = msg.length;
				return this;
			}
		}
	}
	kquery.isFunction = function(str){
		return typeof str === 'function';
	}
	kquery.isString = function(str){
		return typeof str === 'string';
	}
	kquery.isHTML = function(str){
		return /<[^<>]+>/.test(str);
	}
	kquery.isArray = function(str){
		return typeof str === 'object' && (length in str);
	}
	kquery.fn.init.prototype = kquery.fn;
	w.kquery = w.$ = kquery;
})(window)