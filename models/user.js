'use strict';
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const lmax = require('limax');
const fs = require('fs');
const customConfig = JSON.parse(fs.readFileSync('./config/secret.json'));


module.exports = ((sequelize, DataTypes) => {
  let User = sequelize.define('user', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      passwordHash: DataTypes.STRING,
      token: DataTypes.VIRTUAL,
      firstName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      lastName: {
        type: DataTypes.STRING,
      },
      callPrice: DataTypes.FLOAT,
      messagePrice: DataTypes.FLOAT,
      about: DataTypes.STRING,
      avatar: DataTypes.STRING,
      slug: DataTypes.STRING,
      code: DataTypes.INTEGER
    }, {
      timestamps: false,
      hooks: {
        beforeCreate(user) {
          user.passwordHash = bcrypt.hashSync(user.password);
          let slugStr = user.firstName + ' ' + user.lastName;
          user.slug = lmax(slugStr, '-');
        },
        afterCreate(user) {
          user.token = jwt.sign(user.id, customConfig.jwtSecret);
        }
      },
      classMethods: {
        associate(models) {
          User.hasMany(models.experience);
          User.belongsToMany(models.topic, { through: models.topicuser });

        }
      },
      instanceMethods: {
        createCode() {
          return Math.round(1000 + Math.random() * 9000);
        }
      }


    }

  );
  return User;
});
