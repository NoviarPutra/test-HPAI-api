const { DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const User = dbConfig.define("user", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("ADMIN", "USER"), defaultValue: "USER" },
});

module.exports = User;
