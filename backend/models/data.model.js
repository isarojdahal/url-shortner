const sequelize = require("../config/db.config");

const DataModel = sequelize.define("Data", {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = DataModel;
