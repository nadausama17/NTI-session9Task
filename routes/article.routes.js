const express = require('express');
const articleRouter = express.Router();
const Article = require('../controllers/article.controller');

articleRouter.get('/',Article.showAllArticles);
articleRouter.get('/singleArticle/:articleId',Article.showSingleArticle);
articleRouter.get('/addArticle',Article.addArticle);
articleRouter.post('/addArticle',Article.addArticleLogic);
articleRouter.get('/deleteArticle/:articleId',Article.deleteArticle);
articleRouter.post('/addComment/:articleId',Article.addArticleComment);
articleRouter.all('*',(req,res)=>res.render("errorPage",{error:'Page not found'}));

module.exports = articleRouter;