const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("urlshortner", "root", "iamsohappy", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
