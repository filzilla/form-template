const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

var application = express();
application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded()); // take in data and read it from the form

 

application.get('/', (request, response) => {
    response.render('form')
   //response.send('Hi!');
});


application.post('/', (request, response) =>{

var signInInfo = {};
signInInfo.name = request.body.name;
signInInfo.email = request.body.email;
signInInfo.DOB = request.body.DOB;
signInInfo.position = request.body.position;
signInInfo.password = request.body.password;

response.render('./sign-in-success', signInInfo)

});

application.listen(3000);

