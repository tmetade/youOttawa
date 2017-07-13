const hbs = require('express-hbs');
const express = require('express')
const app = express()
const formidable = require('express-formidable');
var Horseman = require("node-horseman");
var horseman = new Horseman({timeout: 10000, injectJquery: true, ignoreSSLErrors: true});
var applications = require(__dirname + '/data/applications.json');


app.listen(process.env.PORT || 3000)

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/semantic'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/data'));
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

	var feed = Promise.all([getFulcrumNews()]);

	feed.then(function(data){
		console.log("GOT THTE FEED BACK");
		console.log(data);

		app.set('feed', data[0])
		app.set('links', applications)
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

function getFulcrumNews(){
	return horseman
			.on('resourceError', function(err) {
			    console.log(err.message)
			})
			.open("http://thefulcrum.ca/category/news/uottawa/")
			.evaluate(function(){

					var fulcrumFeed = [];

					jQuery("article").each(function(){
							var article = {};

							article["source"] = "Fulcrum";
							article["type"] = "news";

							var time = jQuery(this).find("time")[0];
							article["time"] = jQuery(time).text();
							
							var url = jQuery(this).find("a")[0];
							article["url"] = jQuery(url).attr("href");

							var title = jQuery(this).find("a")[1];
							article["title"] = jQuery(title).text();

							fulcrumFeed.push(article);
					})

					return fulcrumFeed;

				//} catch(err){console.log("failed due to error");}

			}).close();
}


function getUCalendarInfo(){
		return horseman
				.on('resourceError', function(err) {
			    	console.log(err.message)
				})	
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

						 	newsfeed[priIndex]["source"] = "uOCalendar";

							if(context == "title"){
								newsfeed[priIndex]["url"] = actualContent.attr("href");
				            }


				        }

					
				    });

				    
				})

				 return newsfeed;
			} catch(err){
				return "Failed to process from uOCal";
			}


		  }).close();
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
		feed: app.get('feed'),
		links: app.get('links')
	})
})