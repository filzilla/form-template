const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var application = express();
application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded()); // take in data and read it from the form
application.use(expressValidator);
 
application.get('/', (request, response) => {
    response.render('form')
   //response.send('Hi!');
});

application.post('/', (request, response) =>{

var signInInfo = {};
signInInfo.name = request.body.name.isLength(1,100);
signInInfo.email = request.body.email.isLength(1,100);
signInInfo.DOB = request.body.DOB;
signInInfo.position = request.body.position;
signInInfo.password = request.body.password.isLength(1,8);

response.render('/password-validation', signInInfo)  //original was './sign-in-success'

});

application.post('/',(request, response) => {
    request.checkBody('name', "No name provided.")
    .notEmpty()
    request.checkBody('email', 'No email provided.')
    .notEmpty();


    request.checkBody('password', 'No password was provided.')
    .notEmpty();
    request.checkBody('password', 'Password must be valid.')
    .matches(/^\w+/g);

    var errors = request.validationErrors();
    var model = {errors: errors}; 

    if (model.errors){
        response.render('login', model);
    }
    else {
        response.render('password-validation.mustache');
    }
});

application.listen(3000);

