const express = require("express");
const {
  getPosts,
  createPosts,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPosts,
  createPostValidator
);

// like unlike
router.put('/post/like',requireSignin, like);
router.put('/post/unlike',requireSignin, unlike);

// comment uncomment
router.put('/post/comment',requireSignin, comment);
router.put('/post/uncomment',requireSignin, uncomment);


// get posts by a specific user
router.get("/posts/by/:userId", requireSignin, postByUser);

// get/update/delete a post
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.get("/post/:postId", requireSignin, singlePost);

//photo
router.get("/post/photo/:postId", photo);


// any route containing :userId, our app will first execure userById()
router.param("userId", userById);
// any route containing :postId, our app will first execure postById()
router.param("postId", postById);

module.exports = router;
