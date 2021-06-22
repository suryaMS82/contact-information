var express= require('express');
var bodyParser= require('body-parser');
var expresshandle= require('express-handlebars');
var path= require('path');
var nodemailer= require('nodemailer');

var app= express();

//app.engine('handlebars',expresshandle());
app.set('view engine','ejs');
//path directory 
app.use('/public',express.static(path.join(__dirname,'public')));

//body parser 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res)=> {
    res.render('index');
});

app.post('/send',(req,res)=> {
    var output=`
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone number : ${req.body.number}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    
    `;
async function main() {
let testAccount = await nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: testAccount.user, 
        pass: testAccount.pass, 
    },
    tls:{
        rejectUnauthorized:false
    }
});
    
      // send mail with defined transport object
let info = await transporter.sendMail({
 from: '"nodemailer contact" <suryanr1999@gmail.com>', // sender address
to: "msnreddy1999@gmail.com", // list of receivers
subject: "contact information", // Subject line
text: "Hello world?", // plain text body
html: output // html body
});
    
 console.log("Message sent: %s", info.messageId);
      
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

 res.render('index',);
}

main().catch(console.error);


})


app.listen(4500);
