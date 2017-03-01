var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var flash = require('connect-flash-plus');
var session = require('express-session');



var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}));
 
app.use(flash());
app.get('/' , function(req, res){
  res.render('index');
});

app.get('/index', function(req,res){
  res.render('index')
})
app.get('/about', function(req,res){
  res.render('about')
})
app.get('/contact', function(req,res){
  res.render('contact', {msg : ''});
});


app.post('/contact', function (req, res) {  
  var transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
      user: 'aseelomari87@gmail.com', // Your email id
      pass: 'fadesa12' // Your password
    }
  });

  var text = 'Hello world from \n\n' + req.body.name;
  var mailOptions = {
    from: 'aseelomari87@gmail.com',
    to: req.body.email, 
    subject: req.body.subject, 
    text: req.body.message 
    
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.render('contact',{msg: 'Please check your input'});
    }else {
    res.redirect('index')
    }
   
  });
});

app.listen(port, function (err) {
  console.log('\tlisten to server at port ' + port)
});