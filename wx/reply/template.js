/*
  用来加工处理最终回复用户消息的模板（xml数据）
 */
module.exports = options => {
  
  let replyMessage = `<xml>
        <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
        <MsgType><![CDATA[${options.msgType}]]></MsgType>`;
  
  if (options.msgType === 'text') {//用户发送文本信息
    replyMessage += `<Content><![CDATA[${options.content}]]></Content>`;
  } 
  else if (options.msgType === 'image') { //用户发送图片信息
    replyMessage += `<Image><MediaId><![CDATA[${options.mediaId}]]></MediaId></Image>`;
  } 
  else if (options.msgType === 'voice') { //用户发送语音信息
    replyMessage += `<Voice><MediaId><![CDATA[${options.mediaId}]]></MediaId></Voice>`;
  } 
  else if (options.msgType === 'video') { //用户发送视频信息
    replyMessage += `<Video>
      <MediaId><![CDATA[${options.mediaId}]]></MediaId>
      <Title><![CDATA[${options.title}]]></Title>
      <Description><![CDATA[${options.description}]]></Description>
      </Video>`;
  } 
  else if (options.msgType === 'music') { //用户发送音乐信息
    replyMessage += `<Music>
      <Title><![CDATA[${options.title}]]></Title>
      <Description><![CDATA[${options.description}]]></Description>
      <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
      <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
      <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
      </Music>`;
  } 
  else if (options.msgType === 'news') {
    replyMessage += `<ArticleCount>${options.content.length}</ArticleCount>
      <Articles>`;
  
    options.content.forEach(item => {
      replyMessage += `
        <item>
        <Title><![CDATA[${item.title}]]></Title>
        <Description><![CDATA[${item.description}]]></Description>
        <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
        <Url><![CDATA[${item.url}]]></Url>
        </item>`
    })
  
    replyMessage += `</Articles>`;
  }
  
  replyMessage += '</xml>';
  //最终回复给用户的xml数据
  return replyMessage;
}