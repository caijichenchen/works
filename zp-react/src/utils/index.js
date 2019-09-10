//获取登陆后返回的路径
export function getRedirectTo(type,header){
	let path 
	if(type === 'laoban'){
		path = '/laoban'
	}else if(type === 'dashen'){
		path = '/dashen'
	}

	if(!header){
		path += 'info'
	}

	return path
}