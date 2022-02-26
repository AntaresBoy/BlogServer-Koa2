 function buildUUID() {
   let uuid = ''
   for (let i = 1; i <= 36; i++) {
     if (i === 9 || i === 14 || i === 19 || i === 24) {
       uuid += '-'
     } else if (i === 15) {
       uuid += 4
     } else if (i === 20) {
       uuid += hexList[(Math.random() * 4) | 8]
     } else {
       uuid += hexList[(Math.random() * 16) | 0]
     }
   }
   return uuid.replace(/-/g, '')
 }


 const hexList = []
 for (let i = 0; i <= 15; i++) {
   hexList[i] = i.toString(16)
 }


 let unique = 0

 function buildShortUUID(prefix = '') {
   const time = Date.now()
   const random = Math.floor(Math.random() * 1000000000)
   unique++
   return prefix + random + unique + String(time)
 }

 // 将时间戳转换为YY-MM-DD hh:mm:ss
 function getYMDHMS(timestamp) {
   timestamp = typeof timestamp === 'number' ? timestamp : parseInt(timestamp)
   let time = new Date(timestamp)
   let year = time.getFullYear()
   const month = (time.getMonth() + 1).toString().padStart(2, '0')
   const date = time
     .getDate()
     .toString()
     .padStart(2, '0')
   const hours = time
     .getHours()
     .toString()
     .padStart(2, '0')
   const minute = time
     .getMinutes()
     .toString()
     .padStart(2, '0')
   const second = time
     .getSeconds()
     .toString()
     .padStart(2, '0')

   return (
     year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
   )
 }

 //正则替换文本中的单引号 双引号否则存储mysql数据库时不生效
 function toLiteral(str) {
   const dict = {
     '\b': 'b',
     '\t': 't',
     '\n': 'n',
     '\v': 'v',
     '\f': 'f',
     '\r': 'r'
   };
   return str.replace(/([\\'"\b\t\n\v\f\r])/g, function ($0, $1) {
     return '\\' + (dict[$1] || $1);
   });
 }


 module.exports = {
   buildUUID,
   getYMDHMS,
   toLiteral
 }