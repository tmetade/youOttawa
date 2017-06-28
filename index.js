const hbs = require('express-hbs');
const express = require('express')
const app = express()

app.listen(process.env.PORT || 3000)

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/semantic'));
app.use(express.static(__dirname + '/public'));



app.get('/', function (req, res) {
	res.render('login', {
	  title: 'Login',
	  layout: null
	});

})
