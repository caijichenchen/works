//工具函数包
const {parseString} = require('xml2js');
const {writeFile,readFile} = require('fs');
const {resolve} = require('path');
module.exports = {
	getUserDataAsync(req){
		return new Promise((resolve,reject)=>{
			let xmlData = '';
			//读取微信服务器发送的数据
			req
			.on('data',data=>{
	          //读取的数据是buffer，需要将其转化成字符串
	          xmlData += data.toString();
			})
			.on('end',()=>{
				//当数据接受完毕时，会触发当前
				resolve(xmlData)
			})
		})
	},
	parseXMLAsync (xmlData) {
	    return new Promise((resolve, reject) => {
	      parseString(xmlData, {trim: true}, (err, data) => {
	        if (!err) {
	          resolve(data);
	        } else {
	          reject('parseXMLAsync方法出了问题:' + err);
	        }
	      })
	    })
	},
	formatMessage (jsData) {
	    let message = {};
	    //获取xml对象
	    jsData = jsData.xml;
	    //判断数据是否是一个对象
	    if (typeof jsData === 'object') {
	      //遍历对象
	      for (let key in jsData) {
	        //获取属性值
	        let value = jsData[key];
	        //过滤掉空的数据
	        if (Array.isArray(value) && value.length > 0) {
		        //将合法的数据复制到message对象上
		        message[key] = value[0];
	        }
	      }
	    }
	    
	    return message;
	},
	writeFileAsync(data,fileName){
		const filePath = resolve(__dirname, fileName);
		//将要保存的数据转化成字符串
		data = JSON.stringify(data)
		return new Promise((resolve,reject)=>{
			writeFile(filePath,data,err=>{
				if(!err){
					resolve()
				}else{
					reject('writeFileAsync  err')
				}
			})
		})
	},
	readFileAsync(fileName){
		const filePath = resolve(__dirname, fileName);
		return new Promise((resolve,reject)=>{
			readFile(filePath,(err,data)=>{
				if(!err){
					//将读取的数据转化成对象
					data = JSON.parse(data)
					resolve(data)
				}else{
					reject('readFileAsync err')
				}
			})
		})
	}
}