const fs = require('fs')
const url = require('url')
const path = require('path')
const MIME = require('./mime.js')

module.exports = function(req, res){
  // 路径补全
  let pathname ='./app'+ url.parse(req.url==='/'?'/index.html':req.url).pathname
  // 解析路径获得文件扩展名
  let extName=path.extname(pathname)
  let contentType=MIME.types[extName.slice(1)]
  // 匹配对应的编码类型
  let encodingType = /(image|video|audio)/.test(contentType)?'binary':'utf-8'
  
  // 判断文件是否存在
  fs.exists(pathname, (exists) => {
    if(!exists){
      res.writeHead(404,{'Content-Type': 'text/plain'})
      res.end(pathname+'not found')
    }else {
      // 写响应头
      res.writeHead(200,{'Content-Type': contentType})
      // 读文件并写响应内容 然后关掉此次通信
      fs.readFile(pathname,encodingType,function(e,d){
        res.write(d, encodingType);
        res.end()
      })
    }
  })
}
