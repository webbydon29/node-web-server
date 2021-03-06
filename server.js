console.log('express app');

const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  let now = new Date().toString();
  let log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// ======for maintenance purposes===========//
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
//middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'about Page'
  });
});


app.get('/bad', (req, res) => {
  res.send ( {
    errorMessage: 'Unable to handle request'
  });
});

app.get('/contact', (req,res) => {
  res.send('<h1>Contact</h1>')
});


app.listen(port, () => {
  console.log(`server is up on port  ${port}`);
});
