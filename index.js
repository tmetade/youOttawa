const hbs = require('express-hbs');
const express = require('express')
const app = express()
const formidable = require('express-formidable');
var Horseman = require("node-horseman");
var horseman = new Horseman();


app.listen(process.env.PORT || 3000)

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/semantic'));
app.use(express.static(__dirname + '/public'));
app.use(formidable());



app.get('/', function (req, res) {
	res.render('login', {
	  title: 'Login',
	  layout: null
	});

})

app.post('/submit', function(req, res) {
	res.redirect('/index');

	var auth = req.fields;
	console.log(req.fields);

	var num = horseman
		.userAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25")
		.open("https://idp3.uottawa.ca/idp/login.jsp?actionUrl=%2Fidp%2FAuthn%2FUserPassword")
		.type("#username", auth.email)
		.type("#password", auth.password)
		.click("body > article > form > div > div:nth-child(4) > button")
		.wait(5000)
		.screenshot("testing.png")


	  // .open('http://uozone2.uottawa.ca')
	  // .type('#userid', auth.email)
	  // .type('#password', auth.password)
	  // .click("#uoaccess-form > div:nth-child(3) > input.silverb")
	  // .wait(10000)
	  // .screenshot('thisisthetest.png')

	  // .waitForSelector("#header > nav > ul > li.leaf.has-children.menu-mlid-818 > a")
	  // .screenshot(__dirname)
	  // .exists("#header > nav > ul > li.leaf.has-children.menu-mlid-818 > a")
	  // .click("#header > nav > ul > li.leaf.has-children.menu-mlid-818 > a")
	  // .title().log();

	console.log(num);
});


app.get('/index', function(req, res){
	res.render('index', {
		title: 'youOttawa',
		layout: null
	})
})






