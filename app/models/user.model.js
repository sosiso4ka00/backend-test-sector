module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    },
    { updatedAt: false },
  );

  return User;
};
