var express = require('express')
var path = require('path')

var app = express();
var port = 3000;


app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))
app.listen(port,function(err){
  console.log('\tlisten to server at port ' + port)
})