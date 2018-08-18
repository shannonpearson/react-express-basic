

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      test: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  /* eslint no-unused-vars:0 */
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
