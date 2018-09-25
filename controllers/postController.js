const db = require("../models");

// Post controller
module.exports = {

  /* CREATE A NEW POST
    route- POST /api/posts
    body- post, type
  */
  addPost: (req, res, next) => {
    if (!req.user) {
      return res.json({ success: false, message: "Not signed in" });
    };

    let { post, type } = req.body;
    let author = req.user._id;

    savePost({ post, type, author });

    function savePost(obj) {
      new db.Post(obj).save((err, post) => {
        if (err) {
          res.json({ success: false, message: err });
        } else if (!post) {
          res.send(400);
        } else {
          return res.json({ success: true, message: post });
        };
        next();
      });
    };
  },

  /* GET ALL POSTS (news feed etc...)
    route- GET /api/posts
  */
  getAll: (req, res, next) => {
    db.Post.find(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, post) => {
        if (err)
          res.json({ success: false, message: err });
        else if (!post)
          res.send(404);
        else
          res.json(post);
        next();
      })
  },

  /* LIKE A POST
    route- PUT /api/posts
    body- post_id
  */
  likePost: (req, res, next) => {
    const postId = req.body.post_id;
    const userId = req.user._id;
    db.Post.findById(postId).then((post) => {
      return post.like({
        author: userId
      }).then(() => {
        return res.json({ success: true, message: "Liked post!" });
      })
    }).catch(next);
  },


  /* ADD A COMMENT TO A POST
    route- POST /api/posts/comment
    body- post_id, comment
  */
  commentPost: (req, res, next) => {
    db.Post.findById(req.body.post_id).then((post) => {
      return post.comment({
        author: req.user._id,
        text: req.body.comment
      }).then(() => {
        return res.json({ success: true, message: "Commented!" });
      })
    }).catch(next);
  },


  /* FETCH ONE INDIVIDUAL POST
    route- get /api/posts/:id
    params- id (the post's id)
  */
  getPost: (req, res, next) => {
    db.Post.findById(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, post) => {
        if (err)
          res.json({ success: false, message: err });
        else if (!post)
          res.sendStatus(404);
        else
          res.json(post);
        next();
      })
  },

  /* EDIT POST
    route- put /api/posts/:id
    params- id (the post's id)
    body- post
  */
  editPost: (req, res, next) => {
    res.send("Working on it...");
  },

  /* DELETE POST
    route- delete /api/posts/:id
    params- id (the post's id)
  */
  deletePost: (req, res, next) => {
    db.Post.findOneAndDelete({_id: req.params.id}).then(() => {
      res.json({success: true, message: "Deleted post"})
    }).catch(err => {
      res.json({success: false, message: err})
    })
  }

};