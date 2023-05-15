const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");
const UserData = require("./UserData.json");
const BlogData = require("./BlogData.json");
const CommentData = require("./CommentData.json");

const getRandomUserId = (users) => {
  const x = Math.floor(Math.random() * users.length);
  return users[x].id;
};

const getRandomBlogId = (blogs) => {
  const x = Math.floor(Math.random() * blogs.length);
  return blogs[x].id;
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(UserData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(BlogData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogs) {
    const randomUserId = getRandomUserId(users);

    await blog.update({
      user_id: randomUserId,
    });
  }

  for (const comment of CommentData) {
    const randomUserId = getRandomUserId(users);
    const randomBlogId = getRandomBlogId(blogs);

    await Comment.create({
      ...comment,
      user_id: randomUserId,
      blog_id: randomBlogId,
    });
  }

  process.exit(0);
};

seedDatabase();
