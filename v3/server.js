const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');   // pren 1 seul parametre qui est le chemin absolu ou sont les partials (partie du site reutilisable genre header footer)
app.set('view engine', 'hbs'); // configure le view model
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + " " + req.method + " "+ req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })
app.use(express.static(__dirname));   // app.use () permet de register un middleware, et pren une fonction en param ------  permet de localiser le dossier courant du projet    utile dans un site static, sans backend

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('toup', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'LE TITRE',
    hometext: 'Home Text Niggz',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'LE TITRE',
    aboutext: 'About Text Niggz',
    pageTitle: 'About Page',
  });        // permet de render un template cfg , premier argument le fichier, deuxieme un objet quon ve transmettre pour pouvoir render ses infos
});

app.listen(3000, () => {
  console.log('server up on port: 3000');
});
