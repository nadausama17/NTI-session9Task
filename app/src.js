const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const viewsDir = path.join(__dirname,'../public/views');
const articleRouter = require('../routes/article.routes');

app.use(express.static(path.join(__dirname,'../public/static')));
app.use(express.urlencoded({extended:true}));
app.use(articleRouter);
app.set("view engine","hbs");
app.set("views",viewsDir);
hbs.registerPartials(path.join(__dirname,'../public/layouts'));

module.exports = app;