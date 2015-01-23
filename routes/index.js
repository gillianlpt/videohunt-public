
// var express = require('express');
// var router = express.Router();

module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/', function(req, res) {
    res.render(
      'index', { title: 'Express', user: req.user});
  });

  app.get('/addpost',function(request,response){
    response.render(
      'addPostModal', {title:'Add Post', user:request.user});
  });

  app.get('/postsuccess', function(request, response) {
    response.render(
      'addPostSuccessModal', {title:'Post Success', user: request.user});
  });

  app.get('/admin', function(request, response) {
    response.render(
    'admin', {title: 'Videohunt Admin', user: request.user});
  });

  app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });

  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  var Post = mongoose.model('Post');
  var Comment = mongoose.model('Comment');

  // get all posts
  app.get('/posts', function(req, res, next) {
    Post.find(function(err, posts){
      if(err){ return next(err); }
      res.json(posts);
    });
  });

  // create new post
  app.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post){
      if(err){ return next(err); }

      res.json(post);
    });
  });


  // Preload post objects on routes with ':post'
  app.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post){
      if (err) { return next(err); }
      if (!post) { return next(new Error("can't find post")); }

      req.post = post;
      return next();
    });
  });

  // Preload comment objects on routes with ':comment'
  app.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment){
      if (err) { return next(err); }
      if (!comment) { return next(new Error("can't find comment")); }

      req.comment = comment;
      return next();
    });
  });

  // return a topic
  app.get('/topics/:topic', function(req, res, next) {
    req.topic.populate('comments', function(err, topic) {
      res.json(topic);
    });
  });

  // return a post
  app.get('/posts/:post', function(req, res, next) {
    req.post.populate('comments', function(err, post) {
      res.json(post);
    });
  });


  // upvote a post
  app.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post){
      if (err) { return next(err); }

      res.json(post);
    });
  });


  // create a new comment
  app.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment){
      if(err){ return next(err); }

      req.post.comments.push(comment);
      req.post.save(function(err, post) {
        if(err){ return next(err); }

        res.json(comment);
      });
    });
  });


  // upvote a comment
  app.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment){
      if (err) { return next(err); }

      res.json(comment);
    });
  });


  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  // router.get('/auth/twitter', passport.authenticate('twitter'), function(req, res){
  // });
  app.get('/auth/twitter', passport.authenticate('twitter'));


  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  // router.get('/auth/twitter/callback',
  // passport.authenticate('twitter', { successRedirect: '/',
  // failureRedirect: '/' }),
  // function(req, res) {
  //   res.redirect('/login');
  // });
  // app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  //   successRedirect : '/',
  //   failureRedirect : '/'
  // }));
  //
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect : '/'}),
    function(req, res) {
      console.log(req.user);
      req.session.user = req.user;
      // res.json(req.session.user);
      res.redirect('/');
    }
  );


  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
    }

    // module.exports = router;

}
