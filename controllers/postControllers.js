const { Post, User } = require('../models');

//비동기식으로 제목, 내용 받아서 유저 아이디에 맞게 게시글 작성
exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const post = await Post.create({ title, content, userId });
    res.redirect('/posts/' + post.id);
  } catch (error) {
    res.render('error', { message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
    res.render('post', { post });
  } catch (error) {
    res.render('error', { message: error.message });
  }
};
