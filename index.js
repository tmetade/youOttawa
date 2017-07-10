const hbs = require('express-hbs');
const express = require('express')
const app = express()
const formidable = require('express-formidable');
var Horseman = require("node-horseman");
var horseman = new Horseman({timeout: 10000});


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
	// res.redirect('/index');

	var auth = req.fields;
	console.log(req.fields);

	getUCalendarInfo().then(function(feed){
		console.log("GOT THTE FEED BACK");
		console.log(feed);

		app.set('feed', feed)
		res.redirect('/index');
	}).catch(function(err){console.log("nope" + err)});



	// var num = horseman
	// 	.userAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25")
	// 	.open("https://idp3.uottawa.ca/idp/login.jsp?actionUrl=%2Fidp%2FAuthn%2FUserPassword")
	// 	.type("#username", auth.email)
	// 	.type("#password", auth.password)
	// 	.click("body > article > form > div > div:nth-child(4) > button")
	// 	.wait(5000)
	// 	.screenshot("testing.png")


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

	// console.log(num);
});


function getUCalendarInfo(){
		return horseman
		.open('http://uocal.uottawa.ca/en')
		  .evaluate(function() {

		  	try{

				var newsfeed = {};
				var totalItems = jQuery(".litecal-data").length;

				jQuery(".litecal-data").each(function(priIndex){
					var content = jQuery(this);
					var contentChildren = content.children();
					newsfeed[priIndex] = {};

					contentChildren.each(function(index){
						 var childContent = jQuery(this);
				         var actualContent = childContent.children();
						 var context;

						switch(index){
				            case 0:
								context = "time";
							break;
				            case 1:
								context = "title";
							break;
				            case 2: 
								context = "location";
							break;
				        }

						if(actualContent.children().length > 0){
							actualContent = jQuery(actualContent.children()[0]);
				        } else {
							actualContent = jQuery(actualContent[0]);
				        }
						
						if(actualContent.text() != ""){
							
							newsfeed[priIndex]["type"] = "event";

						 	newsfeed[priIndex][context] = actualContent.text();

							if(context == "title"){
								newsfeed[priIndex]["url"] = actualContent.attr("href");
				            }
				        }

					
				    });

				    
				})

				 return newsfeed;
 

		  	} catch(err){
		  		return "Unexpected error: " + err ;
		  	}

		  });
}


var feed = [{
	"source": "Twitter",
	"age": "2 days",
	"content": "Gee-gees expected to face Carleton Ravens in Panda Bowl Cup this October, buy your tickets now!"
},
{
	"source": "UoZone",
	"age": "3 days",
	"content": "Exam schedules are up, go to My Exam Schedule to view it!"
},
{
	"source": "Brightspace",
	"age": "4 months",
	"content": "Your mark for Assignment three has been updated! Click here to see it!"
}];



app.get('/index', function(req, res){
	console.log(app.get('feed'));
	res.render('index', {
		title: 'youOttawa',
		layout: null,
		feed: app.get('feed')
	})
})








