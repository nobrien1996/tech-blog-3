const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userStuff = require('./userStuff.json');
const postStuff = require('./postStuff.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userStuff, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postStuff) {
    await Post.create({
      ...post,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
