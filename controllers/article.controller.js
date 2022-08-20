const myConnection = require('../database/connect');
const {ObjectId} = require('mongodb');
class Article{
    static showAllArticles = (req,res)=>{
        myConnection((err,db)=>{
            if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
            db.collection("articles").find({}).toArray((e,articles)=>{
                if(e) return res.render("errorPage",{error:'Can\'t find Articles'});
                res.render("allArticles",{articles});
            });
        });
    }
    static showSingleArticle = (req,res)=>{
        myConnection((err,db)=>{
            if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
            db.collection("articles").findOne({_id:ObjectId(req.params.articleId)})
            .then((article)=>{
                res.render("singleArticle",{article});
            }).catch((e)=>{
                console.log(e);
                return res.render("errorPage",{error:'Failed to view Article'});
            })
        })
    }
    static addArticle = (req,res)=>{
        res.render("addArticle");
    }
    static addArticleLogic = (req,res)=>{
        let errors = {};
        if(!req.body.title) errors.title = 'You should enter a title';
        if(!req.body.content) errors.content = 'You should enter a content';
        if(Object.keys(errors).length == 0){
            myConnection((err,db)=>{
                if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
                db.collection("articles").insertOne({...req.body,comments:[]})
                .then((result)=>{
                    console.log(result);
                    res.redirect("/");
                }).catch((e)=>{
                    console.log(e);
                    res.render("errorPage",{error:'Failed to Add the Data'});
                })
            })
        }else{
            res.render("addArticle",{errors});
        }
    }
    static deleteArticle = (req,res)=>{
        myConnection((err,db)=>{
            if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
            db.collection("articles").deleteOne({_id:ObjectId(req.params.articleId)})
            .then((result)=>{
                console.log(result);
                res.redirect("/");
            }).catch((e)=>{
                console.log(e);
                return res.render("errorPage",{error:'Failed to delete'});
            })
        })
    }
    static addArticleComment = (req,res)=>{
        let errors = {};
        if(!req.body.name) errors.name = 'You should enter name';
        if(!req.body.details) errors.details = 'You should enter details';
        if(Object.keys(errors).length == 0){
            myConnection((err,db)=>{
                if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
                db.collection("articles").updateOne({_id:ObjectId(req.params.articleId)},{$push:{"comments":{id:Date.now(),...req.body}}})
                .then((result)=>{
                    console.log(result);
                    res.redirect(`/singleArticle/${req.params.articleId}`);
                }).catch((e)=>{
                    console.log(e);
                    res.render("errorPage",{error:'Failed to Add a Comment'});
                })
            })
        }else{
            myConnection((err,db)=>{
                if(err) return res.render("errorPage",{error:'Can\'t connect to server'});
                db.collection("articles").findOne({_id:ObjectId(req.params.articleId)})
                .then((article)=>{
                    res.render("singleArticle",{errors,article});
                }).catch((e)=>{
                    res.render("errorPage",{error:'Article not found'});
                })
            })
        }
    }
}

module.exports = Article;